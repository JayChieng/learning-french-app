import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";
import {
  deleteAdminContentDocument,
  getAdminContentDocuments,
  getAdminDashboardStats,
  getAdminUsers,
  saveAdminContentDocument,
  sendAdminMessage,
  setAdminAccountAppAccess,
} from "../../services/firebase";
import type {
  AdminContentCollection,
  AdminContentDocument,
  AdminUserProfile,
} from "../../types/app";
import "./AdminPage.scss";

type AdminStats = {
  lessons: number;
  lessonDetails: number;
  vocabulary: number;
  quizzes: number;
  users: number;
};

const contentCollections: Array<{ id: AdminContentCollection; label: string }> = [
  { id: "lessons", label: "Lessons" },
  { id: "lessonDetails", label: "Lesson details" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "quizzes", label: "Quizzes" },
];

function getNewDocumentTemplate(collectionName: AdminContentCollection): Record<string, unknown> {
  switch (collectionName) {
    case "lessons":
      return { title: "", category: "", level: "Beginner", content: "", order: 1 };
    case "lessonDetails":
      return { lessonId: "", summary: "", dialogues: [], explanations: [] };
    case "vocabulary":
      return { lessonId: "", french: "", english: "", category: "general" };
    case "quizzes":
      return { title: "", description: "", questions: [] };
  }
}

function formatDate(value: unknown) {
  if (!value || typeof value !== "object" || !("toDate" in value)) return "—";
  const toDate = value.toDate;
  if (typeof toDate !== "function") return "—";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(toDate.call(value));
}

function AdminPage() {
  const { auth, refreshLearningContent } = useAppData();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "content">("overview");
  const [stats, setStats] = useState<AdminStats>({
    lessons: 0,
    lessonDetails: 0,
    vocabulary: 0,
    quizzes: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    let isMounted = true;
    getAdminDashboardStats()
      .then((nextStats) => {
        if (isMounted) setStats(nextStats);
      })
      .catch((error: unknown) => {
        if (isMounted) setPageError(error instanceof Error ? error.message : "Could not load dashboard.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const roleLabel = auth.role === "super_admin" ? "Super Admin" : "Admin";

  return (
    <section className="admin-page">
      <header className="admin-page__header">
        <div>
          <span className="admin-page__eyebrow">CONTROL CENTER</span>
          <h1>Admin dashboard</h1>
          <p>Manage learning content, member accounts, and direct messages.</p>
        </div>
        <span className="admin-page__role">{roleLabel}</span>
      </header>

      <nav className="admin-tabs" aria-label="Admin sections">
        {(["overview", "users", "content"] as const).map((tab) => (
          <button
            className={activeTab === tab ? "admin-tabs__tab is-active" : "admin-tabs__tab"}
            key={tab}
            onClick={() => {
              setPageError("");
              setActiveTab(tab);
            }}
            type="button"
          >
            {tab === "overview" ? "Overview" : tab === "users" ? "Members" : "Learning content"}
          </button>
        ))}
      </nav>

      {pageError ? <p className="admin-alert admin-alert--error" role="alert">{pageError}</p> : null}
      {activeTab === "overview" ? (
        <section className="admin-overview">
          <div className="admin-stat-grid">
            {[
              ["Lessons", stats.lessons],
              ["Lesson details", stats.lessonDetails],
              ["Vocabulary", stats.vocabulary],
              ["Quizzes", stats.quizzes],
              ["Members", stats.users],
            ].map(([label, value]) => (
              <article className="admin-stat-card" key={label}>
                <span>{label}</span>
                <strong>{loading ? "…" : value}</strong>
              </article>
            ))}
          </div>
          <div className="admin-shortcuts">
            <button type="button" onClick={() => setActiveTab("users")}>
              <strong>Member management</strong>
              <span>Review profiles, learning progress, and account status.</span>
            </button>
            <button type="button" onClick={() => setActiveTab("content")}>
              <strong>Edit learning content</strong>
              <span>Update lessons, lesson details, vocabulary, and quizzes.</span>
            </button>
            <Link to="/dashboard/messages">
              <strong>Inbox</strong>
              <span>Read messages sent by the administration.</span>
            </Link>
          </div>
        </section>
      ) : activeTab === "users" ? (
        <AdminUsers />
      ) : (
        <AdminContent onContentSaved={refreshLearningContent} />
      )}

      <Link className="admin-page__back" to="/dashboard">Back to dashboard</Link>
    </section>
  );
}

function AdminUsers() {
  const [users, setUsers] = useState<AdminUserProfile[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const refreshUsers = async () => {
    const nextUsers = await getAdminUsers();
    setUsers(nextUsers);
    setSelectedId((current) => current || nextUsers[0]?.id || "");
  };

  useEffect(() => {
    let isMounted = true;
    getAdminUsers()
      .then((nextUsers) => {
        if (!isMounted) return;
        setUsers(nextUsers);
        setSelectedId(nextUsers[0]?.id ?? "");
      })
      .catch((loadError: unknown) => {
        if (isMounted) setError(loadError instanceof Error ? loadError.message : "Could not load members.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase();
    if (!normalizedSearch) return users;
    return users.filter((user) =>
      `${user.name} ${user.email}`.toLocaleLowerCase().includes(normalizedSearch)
    );
  }, [search, users]);
  const selectedUser = users.find((user) => user.id === selectedId);

  const handleAccountStatus = async () => {
    if (!selectedUser) return;
    const action = selectedUser.disabled ? "restore" : "block";
    if (!window.confirm(`Are you sure you want to ${action} ${selectedUser.name}'s access to the app?`)) {
      return;
    }
    setBusy(true);
    setError("");
    setFeedback("");
    try {
      await setAdminAccountAppAccess(selectedUser.id, !selectedUser.disabled);
      await refreshUsers();
      setFeedback(
        selectedUser.disabled
          ? `${selectedUser.name}'s account has been re-enabled.`
          : `${selectedUser.name}'s app access has been blocked.`
      );
    } catch (statusError) {
      setError(statusError instanceof Error ? statusError.message : "Could not update the account.");
    } finally {
      setBusy(false);
    }
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedUser || !message.trim()) return;
    setBusy(true);
    setError("");
    setFeedback("");
    try {
      await sendAdminMessage(selectedUser.id, message);
      setMessage("");
      setFeedback(`Message sent to ${selectedUser.name}.`);
    } catch (sendError) {
      setError(sendError instanceof Error ? sendError.message : "Could not send the message.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="admin-members">
      <section className="admin-panel admin-members__list">
        <div className="admin-panel__heading">
          <div>
            <h2>Members</h2>
            <p>{users.length} registered accounts</p>
          </div>
          <input
            aria-label="Search members"
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search name or email"
            type="search"
            value={search}
          />
        </div>
        {loading ? <p>Loading member accounts…</p> : null}
        <div className="admin-member-list">
          {filteredUsers.map((user) => (
            <button
              aria-pressed={selectedId === user.id}
              className={selectedId === user.id ? "admin-member is-selected" : "admin-member"}
              key={user.id}
              onClick={() => {
                setSelectedId(user.id);
                setFeedback("");
                setError("");
              }}
              type="button"
            >
              <span className="admin-member__avatar">{user.name.slice(0, 1).toLocaleUpperCase()}</span>
              <span className="admin-member__identity">
                <strong>{user.name}</strong>
                <small>{user.email}</small>
              </span>
              <span className={user.disabled ? "admin-status is-disabled" : "admin-status"}>
                {user.disabled ? "App blocked" : "App active"}
              </span>
            </button>
          ))}
          {!loading && filteredUsers.length === 0 ? <p className="admin-empty">No members found.</p> : null}
        </div>
      </section>

      <section className="admin-panel admin-member-detail">
        {!selectedUser ? (
          <div className="admin-empty">Select a member to view account details.</div>
        ) : (
          <>
            <div className="admin-member-detail__header">
              <span className="admin-member__avatar admin-member__avatar--large">
                {selectedUser.name.slice(0, 1).toLocaleUpperCase()}
              </span>
              <div>
                <h2>{selectedUser.name}</h2>
                <p>{selectedUser.email}</p>
              </div>
            </div>
            <dl className="admin-member-facts">
              <div><dt>Role</dt><dd>{selectedUser.role.replace("_", " ")}</dd></div>
              <div><dt>Joined</dt><dd>{formatDate(selectedUser.createdAt)}</dd></div>
              <div><dt>Lessons completed</dt><dd>{selectedUser.completedLessonIds?.length ?? 0}</dd></div>
              <div><dt>Quiz records</dt><dd>{Object.keys(selectedUser.quizResults ?? {}).length}</dd></div>
              <div><dt>Recent activities</dt><dd>{selectedUser.activities?.length ?? 0}</dd></div>
            </dl>
            <section className="admin-member-history">
              <h3>Recent learning activity</h3>
              {selectedUser.activities?.length ? (
                <ul>
                  {selectedUser.activities.slice(0, 5).map((activity) => (
                    <li key={activity.id}>
                      <span>{activity.message}</span>
                      <small>{activity.date}</small>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No activity recorded yet.</p>
              )}
              {selectedUser.completedLessonIds?.length ? (
                <p>Completed lesson IDs: {selectedUser.completedLessonIds.join(", ")}</p>
              ) : null}
            </section>
            <div className="admin-member-actions">
              <button
                className={selectedUser.disabled ? "admin-button" : "admin-button admin-button--danger"}
                disabled={busy}
                onClick={handleAccountStatus}
                type="button"
              >
                {busy ? "Updating…" : selectedUser.disabled ? "Restore app access" : "Block app access"}
              </button>
            </div>
            <p className="admin-member-detail__note">
              This blocks access to the app but does not disable the member’s Firebase Authentication account.
            </p>
            <form className="admin-message-form" onSubmit={handleSendMessage}>
              <h3>Send an in-app message</h3>
              <textarea
                maxLength={2000}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Write a message for this member…"
                required
                rows={4}
                value={message}
              />
              <button className="admin-button" disabled={busy || !message.trim()} type="submit">
                {busy ? "Sending…" : "Send message"}
              </button>
            </form>
          </>
        )}
        {feedback ? <p className="admin-alert admin-alert--success" role="status">{feedback}</p> : null}
        {error ? <p className="admin-alert admin-alert--error" role="alert">{error}</p> : null}
      </section>
    </div>
  );
}

function AdminContent({ onContentSaved }: { onContentSaved: () => Promise<void> }) {
  const [collectionName, setCollectionName] = useState<AdminContentCollection>("lessons");
  const [documents, setDocuments] = useState<AdminContentDocument[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [draftId, setDraftId] = useState("");
  const [draft, setDraft] = useState("");
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  const loadDocuments = async (target: AdminContentCollection, preferredId?: string) => {
    const nextDocuments = await getAdminContentDocuments(target);
    setDocuments(nextDocuments);
    const nextSelectedId = preferredId ?? nextDocuments[0]?.id ?? "";
    setSelectedId(nextSelectedId);
    setIsNew(false);
    const selected = nextDocuments.find((document) => document.id === nextSelectedId);
    setDraftId(selected?.id ?? "");
    setDraft(selected ? JSON.stringify(selected.data, null, 2) : "");
  };

  useEffect(() => {
    let isMounted = true;
    getAdminContentDocuments(collectionName)
      .then((nextDocuments) => {
        if (!isMounted) return;
        setDocuments(nextDocuments);
        setSelectedId(nextDocuments[0]?.id ?? "");
        setDraftId(nextDocuments[0]?.id ?? "");
        setDraft(nextDocuments[0] ? JSON.stringify(nextDocuments[0].data, null, 2) : "");
      })
      .catch((loadError: unknown) => {
        if (isMounted) setError(loadError instanceof Error ? loadError.message : "Could not load content.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [collectionName]);

  const selectDocument = (document: AdminContentDocument) => {
    setSelectedId(document.id);
    setDraftId(document.id);
    setDraft(JSON.stringify(document.data, null, 2));
    setIsNew(false);
    setFeedback("");
    setError("");
  };

  const startNewDocument = () => {
    const prefixes: Record<AdminContentCollection, string> = {
      lessons: "lesson",
      lessonDetails: "lesson-detail",
      vocabulary: "vocab",
      quizzes: "quiz",
    };
    const prefix = prefixes[collectionName];
    setSelectedId("");
    setDraftId(`${prefix}-new`);
    setDraft(JSON.stringify(getNewDocumentTemplate(collectionName), null, 2));
    setIsNew(true);
    setFeedback("");
    setError("");
  };

  const saveDocument = async () => {
    setBusy(true);
    setError("");
    setFeedback("");
    try {
      const parsedDraft: unknown = JSON.parse(draft);
      if (!parsedDraft || typeof parsedDraft !== "object" || Array.isArray(parsedDraft)) {
        throw new Error("The document content must be a JSON object.");
      }
      await saveAdminContentDocument(collectionName, draftId, parsedDraft as Record<string, unknown>, isNew);
      await onContentSaved();
      await loadDocuments(collectionName, draftId.trim());
      setFeedback("Content saved successfully.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Could not save this document.");
    } finally {
      setBusy(false);
    }
  };

  const removeDocument = async () => {
    if (!selectedId || !window.confirm(`Delete "${selectedId}" from ${collectionName}? This cannot be undone.`)) {
      return;
    }
    setBusy(true);
    setError("");
    setFeedback("");
    try {
      await deleteAdminContentDocument(collectionName, selectedId);
      await onContentSaved();
      await loadDocuments(collectionName);
      setFeedback("Document deleted.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Could not delete this document.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="admin-panel admin-content">
      <div className="admin-content__toolbar">
        <label>
          Content type
          <select
            onChange={(event) => {
              setError("");
              setFeedback("");
              setLoading(true);
              setCollectionName(event.target.value as AdminContentCollection);
            }}
            value={collectionName}
          >
            {contentCollections.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <button className="admin-button" onClick={startNewDocument} type="button">New document</button>
      </div>
      <div className="admin-content__workspace">
        <aside className="admin-content__documents" aria-label="Content documents">
          {loading ? <p>Loading documents…</p> : null}
          {documents.map((document) => (
            <button
              aria-pressed={!isNew && selectedId === document.id}
              className={!isNew && selectedId === document.id ? "admin-document is-selected" : "admin-document"}
              key={document.id}
              onClick={() => selectDocument(document)}
              type="button"
            >
              <strong>{document.id}</strong>
              <span>{String(document.data.title ?? document.data.french ?? document.data.lessonId ?? "")}</span>
            </button>
          ))}
          {!loading && documents.length === 0 ? <p className="admin-empty">No documents yet.</p> : null}
        </aside>
        <div className="admin-content__editor">
          {selectedId || isNew ? (
            <>
              <label className="admin-field">
                Document ID
                <input
                  disabled={!isNew}
                  onChange={(event) => setDraftId(event.target.value)}
                  value={draftId}
                />
              </label>
              <label className="admin-field">
                Document data <span>JSON format</span>
                <textarea
                  aria-label="Document JSON"
                  className="admin-content__json"
                  onChange={(event) => setDraft(event.target.value)}
                  spellCheck={false}
                  value={draft}
                />
              </label>
              <div className="admin-content__actions">
                <button className="admin-button" disabled={busy || !draftId.trim()} onClick={saveDocument} type="button">
                  {busy ? "Saving…" : "Save changes"}
                </button>
                {!isNew ? (
                  <button className="admin-button admin-button--danger" disabled={busy} onClick={removeDocument} type="button">
                    Delete
                  </button>
                ) : null}
              </div>
            </>
          ) : (
            <div className="admin-empty">Select a document or create a new one.</div>
          )}
        </div>
      </div>
      {feedback ? <p className="admin-alert admin-alert--success" role="status">{feedback}</p> : null}
      {error ? <p className="admin-alert admin-alert--error" role="alert">{error}</p> : null}
    </section>
  );
}

export default AdminPage;
