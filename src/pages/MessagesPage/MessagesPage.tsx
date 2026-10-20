import { useCallback, useEffect, useState } from "react";
import {
  getCurrentUserId,
  getUserMessages,
  markUserMessageRead,
} from "../../services/firebase";
import type { UserMessage } from "../../types/app";
import "./MessagesPage.scss";

function formatMessageDate(value: unknown) {
  if (!value || typeof value !== "object" || !("toDate" in value)) return "Just now";
  const toDate = value.toDate;
  if (typeof toDate !== "function") return "Just now";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(toDate.call(value));
}

function MessagesPage() {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadMessages = useCallback(async () => {
    const uid = await getCurrentUserId();
    if (!uid) {
      setMessages([]);
      return;
    }
    setMessages(await getUserMessages(uid));
  }, []);

  useEffect(() => {
    let isMounted = true;
    getCurrentUserId()
      .then((uid) => (uid ? getUserMessages(uid) : []))
      .then((nextMessages) => {
        if (isMounted) setMessages(nextMessages);
      })
      .catch((loadError: unknown) => {
        if (isMounted) setError(loadError instanceof Error ? loadError.message : "Could not load messages.");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const openMessage = async (message: UserMessage) => {
    if (message.isRead) return;
    const uid = await getCurrentUserId();
    if (!uid) return;
    try {
      await markUserMessageRead(uid, message.id);
      await loadMessages();
    } catch (markError) {
      setError(markError instanceof Error ? markError.message : "Could not mark this message as read.");
    }
  };

  return (
    <main className="messages-page">
      <header className="messages-page__header">
        <span>YOUR INBOX</span>
        <h1>Messages</h1>
        <p>Updates and notes sent to you by the learning team.</p>
      </header>
      {error ? <p className="messages-page__error" role="alert">{error}</p> : null}
      {loading ? <p>Loading messages…</p> : null}
      {!loading && messages.length === 0 ? (
        <section className="messages-empty">
          <strong>You’re all caught up.</strong>
          <p>Messages from the administration will appear here.</p>
        </section>
      ) : null}
      <div className="messages-list">
        {messages.map((message) => (
          <article
            className={message.isRead ? "message-card" : "message-card message-card--unread"}
            key={message.id}
          >
            <div className="message-card__meta">
              <strong>{message.senderName}</strong>
              <time>{formatMessageDate(message.createdAt)}</time>
            </div>
            <p>{message.body}</p>
            {!message.isRead ? (
              <button onClick={() => void openMessage(message)} type="button">Mark as read</button>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}

export default MessagesPage;
