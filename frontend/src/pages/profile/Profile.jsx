import React, { useState, useEffect } from 'react'
import './Profile.scss'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '@/api/post.api'
// 🔥 deleteMember 추가
import { getMember, deleteMember } from '@/api/member.api' 

const Profile = () => {
  const navigate = useNavigate()
  const [recentPosts, setRecentPosts] = useState([])
  const [memberInfo, setMemberInfo] = useState({
    name: '이름',
    bio: '',
    profileImageUrl: null,
    totalPosts: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = localStorage.getItem('email')
        const [memberRes, postRes] = await Promise.all([
          getMember(email),
          getPosts(email)
        ])
        
        setMemberInfo({
          name: memberRes.data.name || '이름',
          bio: memberRes.data.bio || '자기소개가 없습니다.',
          profileImageUrl: memberRes.data.profileImageUrl || null,
          totalPosts: postRes.data.length
        })
        
        setRecentPosts(postRes.data.slice(0, 3))
      } catch (err) {
        console.error(err)
      }
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/')
  }

  // 🔥 회원 탈퇴 로직 추가
  const handleDeleteAccount = async () => {
    if (window.confirm("탈퇴하시겠습니까?")) {
      try {
        const email = localStorage.getItem('email')
        await deleteMember(email)
        
        // 로컬 스토리지 비우기 및 메인 화면으로 이동
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        alert('회원탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.')
        navigate('/')
      } catch (err) {
        console.error(err)
        alert('회원탈퇴 처리에 실패했습니다.')
      }
    }
  }

  return (
    <section className='profile-page'>
      {/* ... 기존 SVG, 헤더, 배경 코드 생략 없이 그대로 유지 ... */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="torn-effect" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="5" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      <header className="header">
        <div className="logo" onClick={() => navigate('/main')}>
          <span className='span1'>Simple</span>
          <span className='span2'>Paws</span>
        </div>
        <div className="header-right">
          <button className="my-btn" onClick={() => navigate('/profile')}>MY</button>
          <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
        </div>
      </header>

      <div className="torn-paper" />
      <div className="grid-bg" />

      <div className="profile-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &lt; 뒤로가기
        </button>

        <div className="card-content">
          <div className="profile-left">
            <div className="profile-img-wrap">
              {memberInfo.profileImageUrl ? (
                <img src={memberInfo.profileImageUrl} alt="profile" className="profile-img" />
              ) : (
                <div className="profile-img"></div>
              )}
            </div>
            <h2 className="user-name">{memberInfo.name}</h2>
            <button className="edit-profile-btn" onClick={() => navigate('/profile/edit')}>프로필 수정</button>
            {/* 🔥 onClick 추가 */}
            <button className="delete-account-btn" onClick={handleDeleteAccount}>회원탈퇴</button>
          </div>

          <div className="profile-right">
            <div className="section">
              <h3 className="section-title">내 정보</h3>
              <div className="info-boxes">
                <div className="info-box">
                  <span className="box-title">일기 총 갯수</span>
                  <span className="box-value">{memberInfo.totalPosts}개</span>
                </div>
                <div className="info-box">
                  <span className="box-title">이름</span>
                  <span className="box-value">{memberInfo.name}</span>
                </div>
                <div className="info-box">
                  <span className="box-title">자기소개</span>
                  <span className="box-value bio-text">{memberInfo.bio}</span>
                </div>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">최근 작성한 일기</h3>
              <div className="recent-posts">
                {recentPosts.length > 0 ? (
                  recentPosts.map(post => (
                    <div
                      key={post.id}
                      className="post-box has-content"
                      onClick={() => navigate(`/posts/${post.id}`)}
                    >
                      {post.imageUrl && <img src={post.imageUrl} alt="post" />}
                    </div>
                  ))
                ) : (
                  <>
                    <div className="post-box"></div>
                    <div className="post-box"></div>
                    <div className="post-box"></div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile