import React, { useState } from "react";
import "./Signup.scss";
import { useNavigate, NavLink } from "react-router-dom";
import cat from "@/assets/images/sleeping_cat.png";
import { signup } from "@/api/member.api";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (!form.email || !form.password || !form.passwordConfirm || !form.name) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      await signup({
        email: form.email,
        password: form.password,
        name: form.name,
      });
      alert("회원가입이 완료됐어요!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || "회원가입에 실패했습니다. 서버 상태를 확인해주세요.";
      alert(message);
    }
  };

  return (
    <section className="signup">
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

      <div className="signup-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &lt; 뒤로가기
        </button>

        <h1 className="title">회원가입</h1>
        <p className="label">회원이 되어주세요!</p>

        <div className="form">
          <input
            type="email"
            name="email"
            placeholder="이메일 (아이디)"
            value={form.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="비밀번호 확인"
            value={form.passwordConfirm}
            onChange={handleChange}
          />
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={form.name}
            onChange={handleChange}
          />
          <button onClick={handleSignup}>가입하기</button>
        </div>
        <div className="links">
          <NavLink to="/login">이미 계정이 있으신가요?</NavLink>
        </div>

        <img src={cat} alt="cat" className="cat-img" />
      </div>
    </section>
  );
};

export default Signup;