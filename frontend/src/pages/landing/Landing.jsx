import React from 'react'
import './Landing.scss'
import { NavLink } from 'react-router-dom'
import dog1 from '@/assets/images/main_dog1.png'
import dog2 from '@/assets/images/main_dog2.png'
import cat from '@/assets/images/sleeping_cat.png'

const Landing = () => {
  return (
    <section className='landing'>
      {/* SVG 필터 */}
      <svg width="0" height="0" style={{position: 'absolute'}}>
  <filter id="torn-effect" x="-5%" y="-50%" width="110%" height="200%">
    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="5" seed="3" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
  </filter>
</svg>

      {/* 찢어진 종이 상단 효과 */}
      <div className="torn-paper" />

      {/* 격자 배경 */}
      <div className="grid-bg" />

      <div className="landing-content">
        {/* 폴라로이드 사진 2장 */}
        <div className="polaroid-wrap">
          <div className="polaroid polaroid--left">
            <div className="polaroid-img">
              <img src={dog1} alt="dog1" />
            </div>
          </div>
          <div className="polaroid polaroid--right">
            <div className="polaroid-img">
              <img src={dog2} alt="dog2" />
            </div>
          </div>
        </div>

        {/* 텍스트 + 버튼 영역 */}
        <div className="text-wrap">
          <h1 className="title">
            <span>Simple</span>
            <span>Paws</span>
          </h1>
          <img src={cat} alt="sleeping cat" className="cat-img" />
          <div className="sub-wrap">
            <p className="subtitle">작은 발바닥이 남긴 커다란 행복</p>
            <p className="brand">SIMPLE PAWS</p>
          </div>
          <NavLink to="/login">
            <button className="start-btn">기록 시작하기</button>
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default Landing