import React, { useState } from 'react'
import './Login.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import cat from '@/assets/images/sleeping_cat.png'
import { login } from '@/api/auth.api'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError('')

    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }

    try {
      const res = await login({ email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('email', email)
      navigate('/main')
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
    }
  }

  return (
    <section className='login'>
      {/* SVG 필터 */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="torn-effect" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="5" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 찢어진 종이 상단 */}
      <div className="torn-paper" />

      {/* 격자 배경 */}
      <div className="grid-bg" />

      {/* 로그인 카드 */}
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
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleLogin}>로그인</button>
        </div>

        <div className="links">
          <NavLink to="/signup">회원가입</NavLink>
          <span> / </span>
          <NavLink to="/forgot">비밀번호 찾기</NavLink>
        </div>

        <img src={cat} alt="cat" className="cat-img" />
      </div>
    </section>
  )
}

export default Login