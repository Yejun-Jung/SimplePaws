import axios from 'axios'

const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://115.68.226.78:8081',
    withCredentials: true,
})

export default client