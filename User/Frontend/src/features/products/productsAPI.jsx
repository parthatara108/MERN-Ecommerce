import axios from 'axios'

export function fetchProductsByFilter(filter, pagination, sort) {
  let queryString = ''
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  return axios.get('/products/?' + queryString)
    .then(response => {
      const totalItems = response.headers['x-total-count'];
      return { data: { products: response.data, totalItems: totalItems } };
    })

}
export function fetchProductById(id) {
  return axios.get('/products/' + id)
}
export function createProduct(product) {
  return axios.post('/products/', product)
}
export function updateProduct(product) {
  return axios.patch('/products/' + product.id, product)
}

export function fetchBrands() {
  return axios.get('/brands/')
}
export function fetchCategory() {
  return axios.get('/categories/')
}
