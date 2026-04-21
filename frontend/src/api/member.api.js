import client from './client'

export const signup = (data) => {
  return client.post('/members', data)
}

export const getMember = (email) => {
  return client.get('/members', { params: { email } })
}

export const updateMember = (email, data) => {
  return client.put('/members', data, { params: { email } })
}

export const deleteMember = (email) => {
  return client.delete('/members', { params: { email } })
}