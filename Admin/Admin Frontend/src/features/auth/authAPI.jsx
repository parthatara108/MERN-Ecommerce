import axios from 'axios'
export function createAdmin(adminInfo) {
  return axios.post('/auth/admin/signup', adminInfo)
}
export async function checkAdmin(adminInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify(adminInfo),
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
export async function checkAdminAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await axios.get('/auth/admin/check')
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
  return axios.get('/auth/admin/signout')
}


