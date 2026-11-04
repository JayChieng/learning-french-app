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

export function speakQuizTexts(
	texts: string[],
	lang = "fr-FR",
	onComplete?: () => void
) {
	if (typeof window === "undefined" || !("speechSynthesis" in window)) {
		onComplete?.();
		return;
	}

	const phrases = texts
		.map((text) =>
			text
				.replace(/[‐‑‒–—-]/g, " ")
				.replace(/[^\p{L}\p{N}'’\s]/gu, " ")
				.replace(/\s+/g, " ")
				.trim()
		)
		.filter(Boolean);
	if (phrases.length === 0) {
		onComplete?.();
		return;
	}

	stopQuizPrompt();
	phrases.forEach((phrase, index) => {
		const utterance = new SpeechSynthesisUtterance(phrase);
		utterance.lang = lang;
		utterance.rate = 0.75;
		if (index === phrases.length - 1 && onComplete) {
			utterance.onend = onComplete;
			utterance.onerror = onComplete;
		}
		window.speechSynthesis.speak(utterance);
	});
}

export function playQuizAnswerSound(isCorrect: boolean, onComplete?: () => void) {
	if (typeof window === "undefined") {
		onComplete?.();
		return;
	}

	activeAnswerAudio?.pause();
	activeAnswerAudio = new Audio(isCorrect ? correctAnswerAudio : incorrectAnswerAudio);
	activeAnswerAudio.currentTime = 0;
	let hasCompleted = false;
	const complete = () => {
		if (hasCompleted) return;
		hasCompleted = true;
		onComplete?.();
	};
	activeAnswerAudio.onended = complete;
	activeAnswerAudio.onerror = complete;
	void activeAnswerAudio.play().catch(complete);
}
