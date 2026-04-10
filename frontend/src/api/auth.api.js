import client from './client'

// 회원가입
export const signup = (data) => {
  return client.post('/members', data)
}

// 로그인
export const login = (data) => {
  return client.post('/auth/login', data)
}