import { useCallback, useEffect, useState } from "react";
import {
  deleteAdminContentDocument,
  getAdminContentDocuments,
  saveAdminContentDocument,
} from "../../services/firebase";

type Word = {
  id: string;
  french: string;
  ipa: string;
  english: string;
  order: number;
  extra: Record<string, unknown>;
  isNew?: boolean;
};

function toWord(id: string, data: Record<string, unknown>): Word {
  const { french, ipa, english, order, ...extra } = data;
  return {
    id,
    french: typeof french === "string" ? french : "",
    ipa: typeof ipa === "string" ? ipa : "",
    english: typeof english === "string" ? english : "",
    order: typeof order === "number" ? order : 0,
    extra,
  };
}

export default function LessonVocabularyEditor({
  lessonId,
  onSaved,
}: {
  lessonId: string;
  onSaved: () => Promise<void>;
}) {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchWords = useCallback(async () => {
    const documents = await getAdminContentDocuments("vocabulary");
    return documents
      .filter((document) => document.data.lessonId === lessonId)
      .map((document) => toWord(document.id, document.data))
      .sort((first, second) => first.order - second.order);
  }, [lessonId]);

  const load = async () => setWords(await fetchWords());

  useEffect(() => {
    let isMounted = true;
    fetchWords()
      .then((nextWords) => {
        if (isMounted) setWords(nextWords);
      })
      .catch((loadError: unknown) => {
        if (isMounted) setError(loadError instanceof Error ? loadError.message : "Could not load vocabulary.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [fetchWords]);

  const update = (id: string, patch: Partial<Word>) =>
    setWords((current) => current.map((word) => (word.id === id ? { ...word, ...patch } : word)));

  const addWord = () => {
    const nextOrder = words.reduce((max, word) => Math.max(max, word.order), 0) + 1;
    setWords((current) => [
      ...current,
      {
        id: `vocab-${Date.now().toString(36)}`,
        french: "",
        ipa: "",
        english: "",
        order: nextOrder,
        extra: {},
        isNew: true,
      },
    ]);
  };

  const saveWord = async (word: Word) => {
    setBusyId(word.id);
    setMessage("");
    setError("");
    try {
      await saveAdminContentDocument(
        "vocabulary",
        word.id,
        { ...word.extra, lessonId, french: word.french, ipa: word.ipa, english: word.english, order: word.order },
        Boolean(word.isNew)
      );
      await onSaved();
      await load();
      setMessage("Vocabulary saved.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save this word.");
    } finally {
      setBusyId("");
    }
  };

  const removeWord = async (word: Word) => {
    if (word.isNew) {
      setWords((current) => current.filter((item) => item.id !== word.id));
      return;
    }
    if (!window.confirm(`Delete "${word.french || word.id}"? This cannot be undone.`)) return;
    setBusyId(word.id);
    setMessage("");
    setError("");
    try {
      await deleteAdminContentDocument("vocabulary", word.id);
      await onSaved();
      await load();
      setMessage("Word deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete this word.");
    } finally {
      setBusyId("");
    }
  };

  return (
    <div className="admin-form__list">
      <div className="admin-form__list-head">
        <strong>Lesson content: vocabulary and phrases ({lessonId || "no lesson ID"})</strong>
        <span>{words.length}</span>
      </div>
      {loading ? <p>Loading vocabulary…</p> : null}
      {!loading && words.length === 0 ? <p className="admin-empty">No vocabulary for this lesson yet.</p> : null}
      {words.map((word) => (
        <div className="admin-form__item" key={word.id}>
          <div className="admin-form__item-head">
            <span>{word.french || "New word"}</span>
            <small>{word.id}</small>
          </div>
          <label className="admin-field">
            French
            <input onChange={(event) => update(word.id, { french: event.target.value })} value={word.french} />
          </label>
          <label className="admin-field">
            Pronunciation (IPA)
            <input onChange={(event) => update(word.id, { ipa: event.target.value })} value={word.ipa} />
          </label>
          <label className="admin-field">
            English
            <input onChange={(event) => update(word.id, { english: event.target.value })} value={word.english} />
          </label>
          <label className="admin-field">
            Order
            <input
              onChange={(event) => update(word.id, { order: Number(event.target.value) || 0 })}
              type="number"
              value={word.order}
            />
          </label>
          <div className="admin-content__actions">
            <button
              className="admin-button"
              disabled={busyId === word.id || !word.french.trim()}
              onClick={() => saveWord(word)}
              type="button"
            >
              {busyId === word.id ? "Saving…" : "Save word"}
            </button>
            <button
              className="admin-button admin-button--danger"
              disabled={busyId === word.id}
              onClick={() => removeWord(word)}
              type="button"
            >
              {word.isNew ? "Cancel" : "Delete"}
            </button>
          </div>
        </div>
      ))}
      <button className="admin-button" disabled={!lessonId.trim()} onClick={addWord} type="button">
        + Add word or phrase
      </button>
      {message ? <p className="admin-alert admin-alert--success" role="status">{message}</p> : null}
      {error ? <p className="admin-alert admin-alert--error" role="alert">{error}</p> : null}
    </div>
  );
}
