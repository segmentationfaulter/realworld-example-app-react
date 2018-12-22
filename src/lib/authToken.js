const AUTH_TOEKN_FIELD_NAME = '__JWT_TOKEN__'

export function setAuthenticationToken (token) {
  window.localStorage.setItem(AUTH_TOEKN_FIELD_NAME, token)
}

export function getAuthenticationToken () {
  return window.localStorage.getItem(AUTH_TOEKN_FIELD_NAME)
}

export function getAuthenticationHeader () {
  return {
    Authorization: `Token ${getAuthenticationToken()}`
  }
}
