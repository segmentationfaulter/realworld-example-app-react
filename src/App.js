import React from 'react'
import { Router } from '@reach/router'
import axios from 'axios'

import { getCurrentUserUrl } from './urls'
import { getAuthenticationToken } from './lib/authToken'

import RegistrationForm from './views/RegistrationForm'
import LoginForm from './views/LoginForm'
import Home from './views/Home'
import Editor from './views/Editor'
import Article from './views/Atricle/Article';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userLoggedIn: null,
      userResolved: false
    }
  }

  async componentDidMount () {
    const userLoggedIn = await this.fetchUser()
    if (userLoggedIn) {
      this.setState({ userLoggedIn, userResolved: true })
    }
  }

  async fetchUser () {
    const authToken = getAuthenticationToken()
    if (!authToken) {
      this.setState({ userResolved: true })
      return null
    }
    const requestConfig = {
      url: getCurrentUserUrl(),
      method: 'get',
      headers: {
        Authorization: `Token ${authToken}`
      }
    }

    const { data } = await axios(requestConfig)
    const { user } = data
    delete user.token
    return user
  }

  render () {
    const {
      userLoggedIn,
      userResolved
    } = this.state

    if (!userResolved) return null

    return (
      <div>
        <Router>
          <Home path='/' />
          <RegistrationForm path='/register' />
          <LoginForm path='/login' />
          <Editor path='/editor/:slug' />
          <Article path='/article/:slug' userLoggedIn={userLoggedIn} />
        </Router>
      </div>
    )
  }
}
