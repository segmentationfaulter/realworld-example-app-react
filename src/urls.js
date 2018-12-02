const API_ENDPOINT_BASE = 'https://conduit.productionready.io/api'

export const getRegistrationUrl = () => `${API_ENDPOINT_BASE}/users`
export const getLoginUrl = () => `${API_ENDPOINT_BASE}/users/login`
export const getArticlesUrl = (slug) => `${API_ENDPOINT_BASE}/articles/${slug || ''}`
export const getUserFollowingUrl = (username) => `${API_ENDPOINT_BASE}/profiles/${username}/follow`
export const getCurrentUserUrl = () => `${API_ENDPOINT_BASE}/user`
