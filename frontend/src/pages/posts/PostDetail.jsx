import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost, deletePost } from "../../api/post.api";
import "./PostDetail.scss";

const PostDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (err) {
        alert("게시물을 불러오는데 실패했습니다.");
        navigate(-1);
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm("게시물을 삭제하시겠습니까?")) {
      try {
        await deletePost(id);
        alert("삭제되었습니다.");
        navigate("/main");
      } catch (err) {
        alert("삭제 권한이 없거나 실패했습니다.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    navigate('/')
  }

  if (!post) {
    return <div style={{ height: "100vh", backgroundColor: "#E8B84B" }} />;
  }

  return (
    <section className="post-detail">
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="torn-effect" x="-5%" y="-50%" width="110%" height="200%">
          <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="5" seed="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

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

      <div className="torn-paper" />
      <div className="grid-bg" />

      <div className="detail-container">
        <div className="detail-card">
          <button className="back-btn" onClick={() => navigate(-1)}>
            &lt; 뒤로가기
          </button>

          <div className="card-content">
            <div className="media-section">
              <div className="polaroid">
                <div className="img-placeholder">
                  {post.imageUrl && (
                    <img src={post.imageUrl} alt="post" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  )}
                </div>
              </div>
              <div className="action-btns">
                <button onClick={() => navigate(`/posts/edit/${id}`)}>수정하기</button>
                <button onClick={handleDelete}>삭제하기</button>
              </div>
            </div>

            <div className="text-section">
              <p className="date">날짜 : {post.date}</p>
              <p className="title">제목 : {post.title}</p>
              <div className="content">
                <p>내용 : {post.content}</p>
              </div>
              {post.category && (
                <div className="tag">
                  # {post.category === 'DOG' ? '강아지' : post.category === 'CAT' ? '고양이' : post.category}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostDetail;