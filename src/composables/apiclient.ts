import { makeAxios } from '@vue-composable/axios'
import axios, { AxiosRequestConfig } from 'axios'
import useState from '~/store/auth'
const { isLoggedIn, token } = useState()

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  if (isLoggedIn.value) {
    config.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token.value}`,
    }
  }
  return config
})

const useApiClient = () => makeAxios<any>(axiosInstance)

// const apiClient = () => useAxios({
//   baseURL: 'http://localhost:8080/api/',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json',
//   },
// })
export default useApiClient
