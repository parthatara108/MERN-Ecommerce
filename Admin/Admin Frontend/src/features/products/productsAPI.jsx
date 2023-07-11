import axios from 'axios'

export async function fetchProductsByFilter(filter, pagination) {
  let queryString = ''
  for (let key in filter) {
    queryString += `${key}=${filter[key]}&`
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return await axios.get('/products/?' + queryString)
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
export function deleteProduct(id) {
  return axios.delete('/products/delete/' + id)
}


export async function fetchBrands(pagination) {
  let queryString = ''
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return await axios.get('/brands/?' + queryString)
    .then(response => {
      const totalItems = response.headers['x-total-count'];
      return { data: { brands: response.data, totalItems: totalItems } };
    })
}
export function createBrand(brand) {
  return axios.post('/brands/', brand)
}
export function deleteBrand(id) {
  return axios.delete('/brands/delete/' + id)
}

export async function fetchCategory(pagination) {
  let queryString = ''
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return await axios.get('/categories/?' + queryString)
    .then(response => {
      const totalItems = response.headers['x-total-count'];
      return { data: { categories: response.data, totalItems: totalItems } };
    })
}
export function createCategory(category) {
  return axios.post('/categories/', category)
}
export function deleteCategory(id) {
  return axios.delete('/categories/delete/' + id)
}