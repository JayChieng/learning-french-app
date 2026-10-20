function normalizeTerm(value) {
  return value.trim().toLocaleLowerCase();
}

export function createQuestionSpeechSegments(prompt, vocabulary) {
  const match = prompt.match(
    /^(What does)\s+(.+?)(\s+mean(?:\s+in these phrases)?\??)$/i
  );

  if (!match) {
    throw new Error(`Cannot split quiz prompt into speech segments: ${prompt}`);
  }

  let spokenTerm = match[2].trim();
  const firstCharacter = spokenTerm[0];
  const lastCharacter = spokenTerm[spokenTerm.length - 1];

  if (
    (firstCharacter === "'" && lastCharacter === "'") ||
    (firstCharacter === '"' && lastCharacter === '"')
  ) {
    spokenTerm = spokenTerm.slice(1, -1).trim();
  }

  const normalizedTerm = normalizeTerm(spokenTerm);
  const normalizedFrench = normalizeTerm(vocabulary.french ?? "");
  const normalizedEnglish = normalizeTerm(vocabulary.english ?? "");
  const frenchMatches = normalizedFrench === normalizedTerm || normalizedFrench.includes(normalizedTerm);
  const englishMatches = normalizedEnglish === normalizedTerm || normalizedEnglish.includes(normalizedTerm);

  if (frenchMatches === englishMatches) {
    throw new Error(`Cannot determine the language of '${spokenTerm}' from its vocabulary entry.`);
  }

  const termLanguage = frenchMatches && !englishMatches ? "fr-FR" : "en-US";

  return [
    { text: match[1], lang: "en-US" },
    { text: spokenTerm, lang: termLanguage },
    { text: match[3].trim(), lang: "en-US" },
  ];
}