const API_ENDPOINT_BASE = 'https://conduit.productionready.io/api'

export const getRegistrationUrl = () => `${API_ENDPOINT_BASE}/users`
export const getLoginUrl = () => `${API_ENDPOINT_BASE}/users/login`
export const getArticlesUrl = (slug) => `${API_ENDPOINT_BASE}/articles/${slug || ''}`
export const getAuthorFollowingUrl = (authorUsername) => `${API_ENDPOINT_BASE}/profiles/${authorUsername}/follow`
export const getCurrentUserUrl = () => `${API_ENDPOINT_BASE}/user`
export const getArticleFovoritingUrl = (slug) => `${API_ENDPOINT_BASE}/articles/${slug}/favorite`
export const getArticleCommentsUrl = (slug) => `${API_ENDPOINT_BASE}/articles/${slug}/comments`
