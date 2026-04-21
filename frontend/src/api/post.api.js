import client from './client'

export const getPresignedUrl = (filename) => {
  return client.post('/api/s3/presigned', { filename })
}

export const uploadToS3 = async (presignedUrl, file) => {
  return fetch(presignedUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  })
}

export const getPosts = (email) => {
  return client.get('/posts', { params: { email } })
}

export const getPost = (postId) => {
  return client.get(`/posts/${postId}`)
}

export const createPost = (email, data) => {
  return client.post('/posts', data, { params: { email } })
}

export const updatePost = (postId, data) => {
  return client.put(`/posts/${postId}`, data)
}

export const deletePost = (postId) => {
  return client.delete(`/posts/${postId}`)
}