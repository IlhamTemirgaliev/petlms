import axios from 'axios'
import Cookies from 'js-cookie'

const apiUrl = import.meta.env.VITE_API_URL
const token = Cookies.get('token')

export function getClasses() {
  return axios.get(`${apiUrl}/classes`, {
    headers: {
      Authorization: token,
    },
  })
}

export function toggleEnrollment(id: number, data: { open_for_enrollment: boolean }) {
  return axios.post(`${apiUrl}/classes/${id}/toggle`, data, {
    headers: {
      Authorization: token,
    },
  })
}
