import axios from 'axios'

const BACKEND_HOST = process.env.BACKEND_HOST
const BACKEND_PORT = process.env.BACKEND_PORT

const backendApi = axios.create({
  baseURL: `${BACKEND_HOST}:${BACKEND_PORT}`
})

export default backendApi
