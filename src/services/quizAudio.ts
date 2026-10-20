import correctAnswerAudio from "../assets/audio/correct-answer.mp3";
import incorrectAnswerAudio from "../assets/audio/incorrect-answer.mp3";
import type { QuizQuestion, QuizSpeechSegment } from "../types/app";

let activeAnswerAudio: HTMLAudioElement | null = null;

export function speakQuizPrompt(question: Pick<QuizQuestion, "prompt" | "speechSegments">) {
	if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

	stopQuizPrompt();
	const segments: QuizSpeechSegment[] = question.speechSegments?.length
		? question.speechSegments
		: [{ text: question.prompt, lang: "en-US" }];

	segments.forEach((segment) => {
		const utterance = new SpeechSynthesisUtterance(segment.text);
		utterance.lang = segment.lang;
		utterance.rate = 0.75;
		window.speechSynthesis.speak(utterance);
	});
}

export function stopQuizPrompt() {
	if (typeof window !== "undefined" && "speechSynthesis" in window) {
		window.speechSynthesis.cancel();
	}
}

export function speakQuizText(text: string, lang = "fr-FR") {
	if (typeof window === "undefined" || !("speechSynthesis" in window) || !text.trim()) return;

	stopQuizPrompt();
	const utterance = new SpeechSynthesisUtterance(text);
	utterance.lang = lang;
	utterance.rate = 0.75;
	window.speechSynthesis.speak(utterance);
}

export function speakQuizTexts(texts: string[], lang = "fr-FR") {
	if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

	const phrases = texts
		.map((text) =>
			text
				.replace(/[‐‑‒–—-]/g, " ")
				.replace(/[^\p{L}\p{N}'’\s]/gu, " ")
				.replace(/\s+/g, " ")
				.trim()
		)
		.filter(Boolean);
	if (phrases.length === 0) return;

	stopQuizPrompt();
	for (const phrase of phrases) {
		const utterance = new SpeechSynthesisUtterance(phrase);
		utterance.lang = lang;
		utterance.rate = 0.75;
		window.speechSynthesis.speak(utterance);
	}
}

export function playQuizAnswerSound(isCorrect: boolean) {
	if (typeof window === "undefined") return;

	activeAnswerAudio?.pause();
	activeAnswerAudio = new Audio(isCorrect ? correctAnswerAudio : incorrectAnswerAudio);
	activeAnswerAudio.currentTime = 0;
	void activeAnswerAudio.play().catch(() => {});
}
