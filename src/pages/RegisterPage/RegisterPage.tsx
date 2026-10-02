import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthField from "../../components/AuthField/AuthField";
import emailIcon from "../../assets/icons/icons8-email-40.png";
import frenchFlag from "../../assets/icons/icons8-french-flag-48.png";
import googleIcon from "../../assets/icons/icons8-google-48.png";
import lockIcon from "../../assets/icons/icons8-lock-40.png";
import personIcon from "../../assets/icons/icons8-person-50.png";
import { useAppData } from "../../context/AppDataContext";
import "./RegisterPage.scss";

function RegisterPage() {
  const navigate = useNavigate();
  const { register, signInWithGoogle } = useAppData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("Please complete all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setError("");
      await register(name.trim(), email.trim(), password);
      setPassword("");
      setConfirmPassword("");
      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Try a different email.");
      console.error(err);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setError("");
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign up failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <main className="register-page">
      <header className="register-page__brand">
        <div>
          <img src={frenchFlag} alt="" />
          <span>French Learning</span>
        </div>
      </header>

      <section className="register-page__wrapper">
        <div className="register-page__heading">
          <h1>Create Your Account</h1>
          <p>Join and start learning French today.</p>
        </div>

        <form
          className="register-page__card"
          onSubmit={(event) => {
            event.preventDefault();
            void handleSubmit();
          }}
        >
          <AuthField
            label="Full Name"
            icon={personIcon}
            placeholder="Enter your name"
            value={name}
            onChange={setName}
          />
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
          <AuthField
            label="Confirm Password"
            icon={lockIcon}
            placeholder="Confirm your password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          {error ? <p className="register-page__error">{error}</p> : null}

          <button className="register-page__submit" type="submit">
            Sign Up
          </button>

          <div className="register-page__divider">
            <span />
            <strong>Or</strong>
            <span />
          </div>

          <button
            className="register-page__google"
            type="button"
            onClick={() => {
              void handleGoogleSignUp();
            }}
          >
            <img src={googleIcon} alt="" />
            Sign Up with Google
          </button>

          <p className="register-page__switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default RegisterPage;