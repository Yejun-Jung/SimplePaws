import client from './client'

// 게시물 전체 조회
export const getPosts = (email) => {
  return client.get('/posts', { params: { email } })
}

// 게시물 단건 조회
export const getPost = (postId) => {
  return client.get(`/posts/${postId}`)
}

// 게시물 생성
export const createPost = (email, data) => {
  return client.post('/posts', data, { params: { email } })
}

// 게시물 수정
export const updatePost = (postId, data) => {
  return client.put(`/posts/${postId}`, data)
}

// 게시물 삭제
export const deletePost = (postId) => {
  return client.delete(`/posts/${postId}`)
}