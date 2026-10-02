import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppData } from "../../context/AppDataContext";
import { getAdminDashboardStats } from "../../services/firebase";

type AdminStats = {
  lessons: number;
  lessonDetails: number;
  vocabulary: number;
  quizzes: number;
  users: number;
};

function AdminPage() {
  const { auth } = useAppData();
  const [stats, setStats] = useState<AdminStats>({
    lessons: 0,
    lessonDetails: 0,
    vocabulary: 0,
    quizzes: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getAdminDashboardStats()
      .then((nextStats) => {
        if (isMounted) {
          setStats(nextStats);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const roleLabel = auth.role === "super_admin" ? "Super Admin" : "Admin";

  return (
    <section style={{ padding: "2rem", display: "grid", gap: "1.25rem" }}>
      <div>
        <h1>Admin dashboard</h1>
        <p>
          You are signed in as <strong>{roleLabel}</strong>. Content management is available here,
          while role changes are reserved for Super Admins.
        </p>
      </div>

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
        {loading ? (
          <p>Loading dashboard statistics…</p>
        ) : (
          <>
            <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
              <h2 style={{ margin: 0 }}>Lessons</h2>
              <p style={{ fontSize: "1.5rem", margin: "0.4rem 0 0" }}>{stats.lessons}</p>
            </article>
            <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
              <h2 style={{ margin: 0 }}>Lesson details</h2>
              <p style={{ fontSize: "1.5rem", margin: "0.4rem 0 0" }}>{stats.lessonDetails}</p>
            </article>
            <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
              <h2 style={{ margin: 0 }}>Vocabulary</h2>
              <p style={{ fontSize: "1.5rem", margin: "0.4rem 0 0" }}>{stats.vocabulary}</p>
            </article>
            <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
              <h2 style={{ margin: 0 }}>Quizzes</h2>
              <p style={{ fontSize: "1.5rem", margin: "0.4rem 0 0" }}>{stats.quizzes}</p>
            </article>
            <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
              <h2 style={{ margin: 0 }}>Users</h2>
              <p style={{ fontSize: "1.5rem", margin: "0.4rem 0 0" }}>{stats.users}</p>
            </article>
          </>
        )}
      </div>

      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Lessons management</h2>
          <p>Review and maintain lesson content from the lessons section.</p>
          <Link to="/dashboard/lessons">Open lessons</Link>
        </article>
        <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Vocabulary management</h2>
          <p>Manage vocabulary entries and lesson-linked terms.</p>
          <Link to="/dashboard/vocabulary">Open vocabulary</Link>
        </article>
        <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Quiz management</h2>
          <p>Review quiz topics and update challenge content.</p>
          <Link to="/dashboard/quiz">Open quizzes</Link>
        </article>
        <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Users management</h2>
          <p>Track registered users and keep role assignments controlled by Super Admins.</p>
          <strong>{stats.users} accounts registered</strong>
        </article>
      </div>

      {auth.role === "super_admin" ? (
        <article style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "1rem" }}>
          <h2 style={{ marginTop: 0 }}>Super Admin controls</h2>
          <p>Use the Firebase Admin script to assign or revoke admin permissions for other accounts.</p>
          <code>node scripts/setAdminClaim.js &lt;uid&gt; --role super_admin</code>
        </article>
      ) : null}

      <Link to="/dashboard">Back to dashboard</Link>
    </section>
  );
}

export default AdminPage;
