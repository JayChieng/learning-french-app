import { useMemo, useState } from "react";
import type { LessonBlueprint, LessonStep, LessonSubLesson } from "../../types/app";
import "./LessonEngine.scss";

type LessonEngineProps = {
  lesson: LessonBlueprint;
  onComplete?: (subLessonId: string) => void;
};

function LessonEngine({ lesson, onComplete }: LessonEngineProps) {
  const [currentSubLessonIndex, setCurrentSubLessonIndex] = useState(0);
  const [completedSubLessons, setCompletedSubLessons] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [feedback, setFeedback] = useState<string>("");

  const subLessons = lesson.subLessons ?? [];
  const currentSubLesson = subLessons[currentSubLessonIndex] as LessonSubLesson | undefined;
  const currentStep = currentSubLesson?.steps[currentStepIndex] as LessonStep | undefined;

  const progress = useMemo(() => {
    return {
      completed: completedSubLessons.length,
      total: subLessons.length,
      percent: subLessons.length === 0 ? 0 : Math.round((completedSubLessons.length / subLessons.length) * 100),
    };
  }, [completedSubLessons.length, subLessons.length]);

  const handleNextStep = () => {
    if (!currentSubLesson || !currentStep) {
      return;
    }

    const isLastStep = currentStepIndex >= currentSubLesson.steps.length - 1;

    if (isLastStep) {
      const nextCompleted = [...completedSubLessons, currentSubLesson.id];
      setCompletedSubLessons(nextCompleted);
      setFeedback(currentSubLesson.completionMessage);
      onComplete?.(currentSubLesson.id);

      if (currentSubLessonIndex < subLessons.length - 1) {
        setCurrentSubLessonIndex((previous) => previous + 1);
        setCurrentStepIndex(0);
      }
      return;
    }

    setCurrentStepIndex((previous) => previous + 1);
  };

  if (!currentSubLesson || !currentStep) {
    return (
      <div>
        <h2>Lesson complete</h2>
        <p>All sub-lessons are finished.</p>
      </div>
    );
  }

  return (
    <section className="lesson-engine">
      <div className="lesson-engine__header">
        <div>
          <strong>{lesson.title}</strong>
          <div>{currentSubLesson.title}</div>
        </div>
        <div>{progress.completed}/{progress.total} sub-lessons</div>
      </div>

      <div className="lesson-engine__card">
        <h3>{currentSubLesson.objective}</h3>
        <p>{currentStep.title ?? currentStep.prompt}</p>
      </div>

      {currentStep.type === "vocabulary" && currentStep.vocabulary ? (
        <div className="lesson-engine__card">
          <div style={{ fontSize: "2rem", fontWeight: 700 }}>{currentStep.vocabulary.french}</div>
          <div>{currentStep.vocabulary.ipa}</div>
          <div><strong>English:</strong> {currentStep.vocabulary.english}</div>
          <div><strong>Example:</strong> {currentStep.vocabulary.exampleFrench}</div>
          <div>{currentStep.vocabulary.exampleEnglish}</div>
          <button className="lesson-engine__button" type="button" onClick={handleNextStep}>Next</button>
        </div>
      ) : null}

      {currentStep.type === "review" ? (
        <div className="lesson-engine__card">
          <p>{currentStep.prompt}</p>
          <div className="lesson-engine__option-list">
            {currentStep.choices?.map((choice) => <button key={choice} className="lesson-engine__option" type="button">{choice}</button>)}
          </div>
          <button className="lesson-engine__button" type="button" onClick={handleNextStep}>Continue</button>
        </div>
      ) : null}

      {currentStep.type === "quiz" ? (
        <div className="lesson-engine__card">
          <p>{currentStep.prompt}</p>
          <div className="lesson-engine__option-list">
            {currentStep.options?.map((option) => <button key={option.id} className="lesson-engine__option" type="button">{option.label}</button>)}
          </div>
          <button className="lesson-engine__button" type="button" onClick={handleNextStep}>Continue</button>
        </div>
      ) : null}

      {currentStep.type === "pronunciation" ? (
        <div className="lesson-engine__card">
          <p>{currentStep.prompt}</p>
          <button className="lesson-engine__button" type="button">Repeat audio</button>
          <button className="lesson-engine__button" type="button" onClick={handleNextStep}>Continue</button>
        </div>
      ) : null}

      {currentStep.type === "conversation" ? (
        <div className="lesson-engine__card">
          {currentStep.conversationLines?.map((line) => (
            <div key={`${line.speaker}-${line.text}`}>
              <strong>{line.speaker}</strong>: {line.text}
            </div>
          ))}
          <button className="lesson-engine__button" type="button" onClick={handleNextStep}>Continue</button>
        </div>
      ) : null}

      {feedback ? <div className="lesson-engine__card">{feedback}</div> : null}
    </section>
  );
}

export default LessonEngine;
