import axios from 'axios'

export function createUser(userInfo) {
  return axios.post('/auth/signup', userInfo)
}
export async function checkUser(userInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

  });
}
export async function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get('/auth/check')
      const data = response.data
      resolve({ data })
    }
    catch (err) {
      reject({ err })
    }
  })
}
export function resetPasswordRequest(email) {
  return axios.post('/auth/reset-password-request', email)
}
export function resetPassword(data) {
  return axios.post('/auth/reset-password', data)
}
export function signOut() {
  return axios.get('/auth/signout')
}


