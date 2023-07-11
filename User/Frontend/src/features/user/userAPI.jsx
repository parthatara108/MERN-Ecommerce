import axios from 'axios'

export function fetchLoggedInUserOrders() {
  return axios.get('/orders/own/')
}
export function fetchLoggedInUser() {
  return axios.get('/user/own')
}

export function updateUser(update) {
  return axios.patch('/user/' + update.id, update)
}