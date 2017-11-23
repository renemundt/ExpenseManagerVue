import decode from 'jwt-decode'
import auth0 from 'auth0-js'
import Router from 'vue-router'
const ID_TOKEN_KEY = 'id_token'
const ACCESS_TOKEN_KEY = 'access_token'

const CLIENT_ID = process.env.AUTH.CLIENT_ID
const CLIENT_DOMAIN = process.env.AUTH.CLIENT_DOMAIN
const REDIRECT = process.env.AUTH.REDIRECT
const SCOPE = process.env.AUTH.SCOPE
const AUDIENCE = process.env.AUTH.AUDIENCE

let userProfile

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
})

export function login () {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
    scope: SCOPE
  })
}

var router = new Router({
  mode: 'history'
})

export function logout () {
  clearIdToken()
  clearAccessToken()
  router.go('/')
}

export function requireAuth (to, from, next) {
  if (!isLoggedIn()) {
    next(
      login()
    )
  } else {
    next()
  }
}

export function getIdToken () {
  return localStorage.getItem(ID_TOKEN_KEY)
}

export function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

function clearIdToken () {
  localStorage.removeItem(ID_TOKEN_KEY)
}

function clearAccessToken () {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

// Get and store access_token in local storage
export function setAccessToken () {
  let accessToken = getParameterByName('access_token')
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}

// Get and store id_token in local storage
export function setIdToken () {
  let idToken = getParameterByName('id_token')
  localStorage.setItem(ID_TOKEN_KEY, idToken)
}

export function isLoggedIn () {
  const idToken = getIdToken()
  return !!idToken && !isTokenExpired(idToken)
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

export function getProfile (cb) {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    throw new Error('Access token must exist to fetch profile')
  }

  if (userProfile) { cb(null, userProfile) }

  // const self = this
  auth.client.userInfo(accessToken, (err, profile) => {
    if (profile) {
      console.log('profile', profile)
      // self.userProfile = profile
      userProfile = profile
    }
    cb(err, profile)
  })
}
