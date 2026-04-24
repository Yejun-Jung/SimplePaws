import React, { useEffect, useState } from 'react'
import './PostAll.scss'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '@/api/post.api'

const PostAll = () => {
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 4

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

  const filteredPosts = posts.filter((post) =>
    post.title?.toLowerCase().includes(search.toLowerCase())
  )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const maxPageButtons = 5
  const startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2))
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1)
  const adjustedStart = Math.max(1, endPage - maxPageButtons + 1)
  const pageNumbers = [...Array(endPage - adjustedStart + 1)].map((_, i) => adjustedStart + i)

  return (
    <section className='post-all'>
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

      <div className="toolbar">
        <input
          className="search-input"
          type="text"
          placeholder="🔍 제목으로 검색"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setCurrentPage(1)
          }}
        />
        <button className="write-btn" onClick={() => navigate('/posts/create')}>
          + 일기 쓰기
        </button>
      </div>

      <div className="post-grid">
        {currentPosts.length === 0 ? (
          <div className="empty-wrap">
            <div className="empty-content">
              <div className="empty-icon">🐾</div>
              <p className="empty-title">아직 작성된 일기가 없어요</p>
              <div className="empty-desc-group">
                <p className="empty-desc">소중한 반려동물과의 순간을 기록해보세요!</p>
                <p className="empty-desc">사진 한 장, 짧은 메모로도 충분해요 🐶🐱</p>
              </div>
              <button className="empty-btn" onClick={() => navigate('/posts/create')}>
                첫 일기 작성하기
              </button>
            </div>
          </div>
        ) : (
          currentPosts.map((post) => (
            <div
              className="post-card"
              key={post.id}
              onClick={() => navigate(`/posts/${post.id}`)}
            >
              <div className="post-img">
                {post.imageUrl ? <img src={post.imageUrl} alt="post" /> : null}
              </div>
              <div className="post-info">
                <div className="text-content">
                  <p className="post-title">제목 : {post.title}</p>
                  <p className="post-date">날짜 : {formatDate(post.createdAt)}</p>
                </div>
                {post.category && (
                  <div className="post-tag">
                    # {post.category === 'ETC' 
                        ? post.customCategory 
                        : (post.category === 'DOG' ? '강아지' : post.category === 'CAT' ? '고양이' : post.category)}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {filteredPosts.length > 0 && (
        <div className="pagination">
          <button 
            className="page-btn nav-btn" 
            onClick={() => paginate(1)} 
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          <button 
            className="page-btn nav-btn" 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => paginate(pageNum)}
              className={`page-btn ${currentPage === pageNum ? 'active' : ''}`}
            >
              {pageNum}
            </button>
          ))}

          <button 
            className="page-btn nav-btn" 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
          <button 
            className="page-btn nav-btn" 
            onClick={() => paginate(totalPages)} 
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </div>
      )}
    </section>
  )
}

export default PostAll