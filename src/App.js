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
      user: null,
      fetchingUser: false
    }
  }

  async componentDidMount () {
    this.setState({ fetchingUser: true })
    const user = await this.fetchUser()
    this.setState({ user }, () => this.setState({ fetchingUser: false }))
  }

  async fetchUser () {
    const authToken = getAuthenticationToken()
    if (!authToken) return
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
      user,
      fetchingUser
    } = this.state

    if (fetchingUser) return null

    return (
      <div>
        <Router>
          <Home path='/' />
          <RegistrationForm path='/register' />
          <LoginForm path='/login' />
          <Editor path='/editor' />
          <Article path='/article/:slug' user={user} />
        </Router>
      </div>
    )
  }
}
