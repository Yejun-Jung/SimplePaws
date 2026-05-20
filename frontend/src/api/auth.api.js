import client from './client'

export const signup = (data) => {
  return client.post('/members', data)
}

export const login = (data) => {
  return client.post('/auth/login', data)
}

export const checkEmail = (email) => {
  return client.get(`/members/check-email?email=${email}`)
}