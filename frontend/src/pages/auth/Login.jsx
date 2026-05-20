import React, { useState } from "react";
import "./Login.scss";
import { NavLink, useNavigate } from "react-router-dom";
import cat from "@/assets/images/sleeping_cat.png";
import { login } from "@/api/auth.api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    window.location.href = "http://115.68.226.78:8081/api/auth/kakao";
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const res = await login({ email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", email);
      navigate("/main");
    } catch (err) {
      setError("이메일 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  return (
    <section className="login">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="torn-effect" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.025"
            numOctaves="5"
            seed="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="50"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="torn-paper" />

      <div className="grid-bg" />

      <div className="login-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &lt; 뒤로가기
        </button>
        <h1 className="title">
          <span>Simple</span>
          <span>Paws</span>
        </h1>
        <p className="label">로그인</p>

        <div className="form">
          <input
            type="text"
            placeholder="아이디"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleLogin}>로그인</button>
          
          <button className="kakao-btn" onClick={handleKakaoLogin}>
            <svg className="kakao-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3C6.477 3 2 6.925 2 11.75c0 3.045 1.8 5.716 4.524 7.244l-.93 3.44c-.09.33.28.596.566.4L10.7 20.01c.42.055.848.084 1.3.084 5.523 0 10-3.925 10-8.75S17.523 3 12 3z" fill="#3C1E1E"/>
            </svg>
            카카오로 로그인
          </button>
        </div>

        <div className="links">
          <p>계정이 없으신가요?</p>
          <NavLink to="/signup">회원가입</NavLink>
        </div>

        <img src={cat} alt="cat" className="cat-img" />
      </div>
    </section>
  );
};

export default Login;