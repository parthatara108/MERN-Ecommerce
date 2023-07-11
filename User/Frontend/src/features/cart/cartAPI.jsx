import axios from 'axios'
export function fetchItemsByUserId() {
  return axios.get('/cart/')
}
export function addItem(item) {
  return axios.post('/cart', item)
}
export function updateItem(itemUpdate) {
  return axios.patch('/cart/' + itemUpdate.id, itemUpdate)
}
export function deleteItem(id) {
  return axios.delete(`/cart/${id}`)
}
export async function resetCart() {
  const res = await fetchItemsByUserId()
  const items = res.data
  for (let item of items) {
    await deleteItem(item.id)
  }
}
