import "./LoginPage.css";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const nav = useNavigate();
  const location = useLocation();

  const [isLogingIn, setIsLogingIn] = useState(false);

  const handleGoogleLlogin = async () => {
    if (isLogingIn) return;

    try {
      setIsLogingIn(true);

      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      const result = await signInWithPopup(auth, provider);

      console.log(result.user);

      const from = location?.state?.from?.pathname || "/";
      nav(from);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLogingIn(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card ">
        <p className="login-label">LOGIN</p>
        <h1 className="login-title">책갈피</h1>
        <p className="login-description">나만의 독서 기록을 시작해보세요</p>
        <button
          className="login-google-btn"
          onClick={handleGoogleLlogin}
          disabled={isLogingIn}
        >
          {isLogingIn ? "로그인 중..." : "Google로 시작하기"}
        </button>
        <p className="login-sub">로그인하면 기록이 안전하게 저장됩니다.</p>
      </div>
    </section>
  );
};

export default LoginPage;
