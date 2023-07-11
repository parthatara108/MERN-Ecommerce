import axios from 'axios'

export function fetchAllOrders(pagination) {
  let queryString = ''
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }
  return axios.get('/orders?' + queryString)
    .then(response => {
      const totalOrders = response.headers['x-total-count'];
      return { data: { orders: response.data, totalOrders: totalOrders } };
    })
}

export function addOrder(item) {
  return axios.post('/orders', item)
}
export function updateOrder(order) {
  return axios.patch('/orders/' + order.id, order)
}
