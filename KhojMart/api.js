const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000'
export async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
  const token = localStorage.getItem('KhojMart_token')
  if (token) headers.Authorization = `Bearer ${token}`
  const response = await fetch(`${baseURL}${path}`, { ...options, headers })
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.detail || 'Request failed')
  return body
}
export const api = {
  stores: () => request('/stores'),
  products: (store, params = {}) => request(`/stores/${store}/products?${new URLSearchParams(params)}`),
  order: (data) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  orders: () => request('/orders'),
  demands: () => request('/demands'),
  saveDemand: (data) => request('/demands', { method: 'POST', body: JSON.stringify(data) }),
  lists: () => request('/lists'),
  saveList: (data) => request('/lists', { method: 'POST', body: JSON.stringify(data) }),
  recommendations: () => request('/recommendations'),
  comparison: (id) => request(`/products/${id}/compare`),
  dashboard: () => request('/admin/dashboard'),
  managerProducts: () => request('/admin/products'),
  managerDemands: () => request('/admin/demands'),
  updateInventory: (id, data) => request(`/admin/inventory/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  login: (data) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
}
