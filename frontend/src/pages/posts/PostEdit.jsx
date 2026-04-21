import React, { useState, useEffect } from "react";
import "./PostEdit.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  getPost,
  updatePost,
  getPresignedUrl,
  uploadToS3,
} from "@/api/post.api";

const CATEGORIES = [
  { label: "🐶 강아지", value: "DOG" },
  { label: "🐱 고양이", value: "CAT" },
  { label: "✏️ 기타", value: "ETC" },
];

const PostEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: "",
    title: "",
    content: "",
  });
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPost(id);
        const data = res.data;

        setForm({
          date: data.date || "",
          title: data.title || "",
          content: data.content || "",
        });
        
        setCategory(data.category || "");
        
        if (data.category === "ETC") {
          setCustomCategory(data.customCategory || "");
        }

        if (data.imageUrl) {
          setPreview(data.imageUrl);
          setExistingImageUrl(data.imageUrl);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!form.date || !form.title || !form.content || !category) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    if (category === "ETC" && !customCategory.trim()) {
      alert("기타 카테고리를 입력해주세요.");
      return;
    }

    try {
      let imageUrl = existingImageUrl;

      if (image) {
        const presignRes = await getPresignedUrl(image.name);
        const { presignedUrl, fileUrl } = presignRes.data;
        await uploadToS3(presignedUrl, image);
        imageUrl = fileUrl;
      }

      await updatePost(id, {
        date: form.date,
        title: form.title,
        content: form.content,
        imageUrl,
        category: category,
        customCategory: category === "ETC" ? customCategory : "",
      });
      alert("일기가 수정되었습니다!");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("일기 수정에 실패했습니다.");
    }
  };

  return (
    <section className="post-edit">
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

      <header className="header">
        <div className="logo" onClick={() => navigate("/main")}>
          <span>Simple</span>
          <span>Paws</span>
        </div>
        <div className="header-right">
          <button className="my-btn" onClick={() => navigate("/profile")}>
            MY
          </button>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("email");
              navigate("/");
            }}
          >
            로그아웃
          </button>
        </div>
      </header>

      <div className="torn-paper" />

      <div className="grid-bg" />

      <div className="edit-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &lt; 뒤로가기
        </button>
        <h1 className="title">게시물 수정</h1>

        <label className="image-upload">
          {preview ? (
            <img src={preview} alt="preview" />
          ) : (
            <span>사진 업로드</span>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>

        <div className="form">
          <div className="form-row">
            <label>날짜 :</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>제목 :</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <label>내용 :</label>
            <input
              type="text"
              name="content"
              value={form.content}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>분류 :</label>
            <div className="category-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.value}
                  className={`category-btn ${category === cat.value ? "active" : ""}`}
                  onClick={() => setCategory(cat.value)}
                  type="button"
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {category === "ETC" && (
            <div className="form-row">
              <label>직접 :</label>
              <input
                type="text"
                placeholder="카테고리를 입력해주세요"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            </div>
          )}
        </div>

        <button className="submit-btn" onClick={handleSubmit}>
          일기 수정하기
        </button>
      </div>
    </section>
  );
};

export default PostEdit;