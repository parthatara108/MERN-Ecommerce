import axios from 'axios'

export function fetchLoggedInUserOrders() {
  return axios.get('/orders/own/')
}
export function fetchAdmin() {
  return axios.get('/user/admin/own')
}

export function updateUser(update) {
  return axios.patch('/user/' + update.id, update)
}