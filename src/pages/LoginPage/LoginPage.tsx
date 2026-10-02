import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthField from "../../components/AuthField/AuthField";
import emailIcon from "../../assets/icons/icons8-email-40.png";
import frenchFlag from "../../assets/icons/icons8-french-flag-48.png";
import googleIcon from "../../assets/icons/icons8-google-48.png";
import lockIcon from "../../assets/icons/icons8-lock-40.png";
import { useAppData } from "../../context/AppDataContext";
import "./LoginPage.scss";

function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useAppData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setError("");
      await signIn(email.trim(), password);
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your email and password.");
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <main className="login-page">
      <header className="login-page__brand">
        <div>
          <img src={frenchFlag} alt="" />
          <span>French Learning</span>
        </div>
      </header>

      <section className="login-page__wrapper">
        <div className="login-page__heading">
          <h1>Welcome Back!</h1>
          <p>Log in to continue your French journey.</p>
        </div>

        <form
          className="login-page__card"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <AuthField
            label="Email Address"
            icon={emailIcon}
            placeholder="Enter your email"
            value={email}
            onChange={setEmail}
          />
          <AuthField
            label="Password"
            icon={lockIcon}
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          {error ? <p className="login-page__error">{error}</p> : null}

          <button className="login-page__submit" type="submit">
            Login
          </button>

          <div className="login-page__divider">
            <span />
            <strong>Or</strong>
            <span />
          </div>

          <button className="login-page__google" type="button" onClick={handleGoogleSignIn}>
            <img src={googleIcon} alt="" />
            Continue with Google
          </button>

          <p className="login-page__switch">
            Don&apos;t have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;