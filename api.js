const store = browser.storage.local
let url
let token

const request = async (url, options) => {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      ...options,
    })
    return response.json()
  } catch (err) {
    console.log(err)
  }
}

const get = (url, options) => request(url, options)
const post = (url, options) => request(url, { ...options, method: 'post' })

export const init = async () => {
  url = await store.get('url')
  token = await store.get('token')
}
export const getRoot = () => get(url)
export const postService = (domain, service, data) =>
  post(`${url}/services/${domain}/${service}`, {
    body: JSON.stringify(data),
  })
