import React, { useEffect, useState } from 'react'
import './PostAll.scss'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '@/api/post.api'

const PostAll = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const email = localStorage.getItem('email')
        const res = await getPosts(email)
        setPosts(res.data)
      } catch (err) {
        console.error('게시물 불러오기 실패', err)
      }
    }
    fetchPosts()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/')
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ''
    return dateStr.split('T')[0].replaceAll('-', '.')
  }

  return (
    <section className='post-all'>
      {/* SVG 필터 */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="torn-effect" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="5" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* 헤더 */}
      <header className="header">
        <div className="logo" onClick={() => navigate('/main')}>
          <span>Simple</span>
          <span>Paws</span>
        </div>
        <div className="header-right">
          <button className="my-btn" onClick={() => navigate('/profile')}>MY</button>
          <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
        </div>
      </header>

      {/* 찢어진 종이 */}
      <div className="torn-paper" />

      {/* 격자 배경 */}
      <div className="grid-bg" />

      {/* 일기 쓰기 버튼 */}
      <div className="write-btn-wrap">
        <button className="write-btn" onClick={() => navigate('/posts/create')}>
          + 일기 쓰기
        </button>
      </div>

      {/* 게시물 그리드 */}
      <div className="post-grid">
        {posts.length === 0 ? (
          <p className="empty">아직 작성된 일기가 없어요 🐾</p>
        ) : (
          posts.map((post) => (
            <div
              className="post-card"
              key={post.id}
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <div className="post-img">
                {post.imageUrl
                  ? <img src={post.imageUrl} alt="post" />
                  : null
                }
              </div>
              <p className="post-title">제목 : {post.title}</p>
              <p className="post-date">날짜 : {formatDate(post.createdAt)}</p>
            </div>
          ))
        )}
      </div>
    </section>
  )
}

export default PostAll