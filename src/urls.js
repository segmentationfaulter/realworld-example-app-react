const API_ENDPOINT_BASE = 'https://conduit.productionready.io/api'

export const getRegistrationUrl = () => `${API_ENDPOINT_BASE}/users`
export const getLoginUrl = () => `${API_ENDPOINT_BASE}/users/login`
export const getArticlesUrl = () => `${API_ENDPOINT_BASE}/articles`
