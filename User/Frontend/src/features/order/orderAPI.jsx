import axios from 'axios'

export function fetchAllOrders(pagination) {
  let queryString = ''
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return axios.get('/orders?' + queryString)
}

export function addOrder(item) {
  return axios.post('/orders', item)
}
export function confirmOrder(item) {
  return axios.post('/orders/confirm', item)
}
export function updateOrder(order) {
  return axios.patch('/orders/' + order.id, order)
}
