import React, { useState, useEffect } from 'react'
import './ProfileEdit.scss'
import { useNavigate } from 'react-router-dom'
import { getMember, updateMember } from '@/api/member.api'
import { getPresignedUrl, uploadToS3 } from '@/api/post.api'

const ProfileEdit = () => {
  const navigate = useNavigate()
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bio: ''
  })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [existingImageUrl, setExistingImageUrl] = useState('')

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const currentEmail = localStorage.getItem('email')
        const res = await getMember(currentEmail)
        const data = res.data

        setForm({
          name: data.name || '',
          email: data.email || '',
          password: '', 
          bio: data.bio || ''
        })

        if (data.profileImageUrl) {
          setPreview(data.profileImageUrl)
          setExistingImageUrl(data.profileImageUrl)
        }
      } catch (err) {
        console.error(err)
      }
    }
    fetchMember()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email) {
      alert('이름과 이메일은 필수입니다.')
      return
    }

    try {
      let profileImageUrl = existingImageUrl

      if (image) {
        const presignRes = await getPresignedUrl(image.name)
        const { presignedUrl, fileUrl } = presignRes.data
        await uploadToS3(presignedUrl, image)
        profileImageUrl = fileUrl
      }

      const currentEmail = localStorage.getItem('email')
      await updateMember(currentEmail, {
        name: form.name,
        email: form.email,
        password: form.password,
        bio: form.bio,
        profileImageUrl
      })

      if (form.email !== currentEmail) {
        localStorage.setItem('email', form.email)
      }

      alert('프로필이 수정되었습니다.')
      navigate('/profile')
    } catch (err) {
      console.error(err)
      alert('프로필 수정에 실패했습니다.')
    }
  }

  return (
    <section className='profile-edit-page'>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
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
          <button className="logout-btn" onClick={() => {
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            navigate('/')
          }}>로그아웃</button>
        </div>
      </header>

      <div className="torn-paper" />
      <div className="grid-bg" />

      <div className="edit-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          &lt; 뒤로가기
        </button>
        
        <h1 className="title">프로필 수정</h1>

        <div className="card-content">
          <div className="edit-left">
            <span className="img-label">프로필 사진</span>
            <label className="profile-upload">
              {preview ? (
                <img src={preview} alt="profile" />
              ) : (
                <div className="placeholder"></div>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} />
            </label>
          </div>

          <div className="edit-right">
            <div className="form">
              <div className="form-row">
                <label>이름 :</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>이메일 :</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label>비밀번호 :</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="변경할 비밀번호 입력 (선택)"
                />
              </div>
              <div className="form-row bio-row">
                <label>자기소개 :</label>
                <textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="btn-group">
              <button className="submit-btn" onClick={handleSubmit}>수정 완료</button>
              <button className="cancel-btn" onClick={() => navigate(-1)}>취소</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfileEdit