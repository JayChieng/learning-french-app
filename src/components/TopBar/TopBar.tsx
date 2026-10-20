import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import bellIcon from "../../assets/icons/icons8-notification-24.png";
import frenchFlag from "../../assets/icons/icons8-french-flag-48.png";
import userIcon from "../../assets/icons/icons8-account-94.png";
import { useAppData } from "../../context/AppDataContext";
import "./TopBar.scss";

const baseItems = [
  { label: "Home", path: "/dashboard" },
  { label: "Lessons", path: "/dashboard/lessons" },
  { label: "Vocabulary", path: "/dashboard/vocabulary" },
  { label: "Quiz", path: "/dashboard/quiz" },
  { label: "Progress", path: "/dashboard/progress" },
  { label: "Messages", path: "/dashboard/messages" },
  { label: "Tips & Resources", path: "/dashboard/tips" },
];

function TopBar() {
  const navigate = useNavigate();
  const { auth, signOut } = useAppData();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const canAccessAdmin = auth.role === "admin" || auth.role === "super_admin";
  const roleLabel =
    auth.role === "super_admin"
      ? "Super Admin"
      : auth.role === "admin"
        ? "Admin"
        : "User";
  const items = canAccessAdmin
    ? [...baseItems, { label: "Admin", path: "/dashboard/admin" }]
    : baseItems;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setSignOutError("");

    try {
      await signOut();
    } catch (error) {
      console.error("Could not sign out.", error);
      setSignOutError("Unable to sign out. Please try again.");
      setIsSigningOut(false);
    }
  };

  return (
    <header className="top-bar">
      <button className="top-bar__brand" onClick={() => navigate("/dashboard")}>
        <img src={frenchFlag} alt="" />
        <span>French Learning</span>
      </button>

      <div className="top-bar__menu-scroll">
        <nav className="top-bar__nav">
          {items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/dashboard"}
              className={({ isActive }) =>
                isActive ? "top-bar__link top-bar__link--active" : "top-bar__link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="top-bar__actions">
          <button className="top-bar__icon" aria-label="Notifications">
            <img src={bellIcon} alt="" />
          </button>
          <div className="top-bar__profile">
            <img src={userIcon} alt="" />
            <div>
              <strong>{auth.name}</strong>
              <div>{roleLabel}</div>
              <button type="button" onClick={handleSignOut} disabled={isSigningOut}>
                {isSigningOut ? "Signing out..." : "Sign out"}
              </button>
              {signOutError ? (
                <div className="top-bar__error" role="alert">
                  {signOutError}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
