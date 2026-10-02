import { useMemo, useRef, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useAppData } from "../../context/AppDataContext";
import volumeIcon from "../../assets/icons/icons8-volume-48.png";
import "./VocabularyPage.scss";

function VocabularyPage() {
  const { vocabulary, pronounceWord } = useAppData();
  const [searchTerm, setSearchTerm] = useState("");
  const nextPronunciationRate = useRef(new Map<string, number>());

  const pronounceVocabularyWord = (word: (typeof vocabulary)[number]) => {
    const rate = nextPronunciationRate.current.get(word.id) ?? 0.5;
    nextPronunciationRate.current.set(word.id, rate === 0.5 ? 1 : 0.5);
    pronounceWord(word, rate);
  };

  const filteredWords = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return vocabulary.filter((word) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        word.french.toLowerCase().includes(normalizedSearch) ||
        word.english.toLowerCase().includes(normalizedSearch) ||
        (word.ipa ?? "").toLowerCase().includes(normalizedSearch);

      return matchesSearch;
    });
  }, [vocabulary, searchTerm]);

  return (
    <section className="vocabulary-page">
      <Breadcrumb current="Vocabulary" />

      <div className="vocabulary-page__intro">
        <h1>Vocabulary</h1>
        <p>
          Learn French words by category, then use audio to repeat them aloud.
        </p>
      </div>

      <div className="vocabulary-page__search">
        <input
          type="text"
          placeholder="Search words..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          aria-label="Search vocabulary words"
        />
      </div>

      <div className="vocabulary-page__grid">
        {filteredWords.map((word) => (
          <article key={word.id} className="vocabulary-page__card">
            <button
              type="button"
              className="vocabulary-page__audio"
              onClick={() => pronounceVocabularyWord(word)}
              aria-label={`Play pronunciation for ${word.french}`}
              title={`Play pronunciation for ${word.french}`}
            >
              <img src={volumeIcon} alt="" />
            </button>

            <h3>{word.french}</h3>
            <p className="vocabulary-page__ipa">{word.ipa ?? ""}</p>
            <p className="vocabulary-page__english">{word.english}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default VocabularyPage;