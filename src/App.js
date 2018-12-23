import React from 'react'
import { Router } from '@reach/router'
import axios from 'axios'

import { getCurrentUserUrl } from './urls'
import { getAuthenticationToken, getAuthenticationHeader } from './lib/authToken'

import RegistrationForm from './views/RegistrationForm'
import LoginForm from './views/LoginForm'
import Home from './views/Home'
import Header from './views/Header'
import Footer from './views/Footer'
import Editor from './views/Editor'
import Article from './views/Atricle/Article'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      userLoggedIn: null,
      userResolved: false
    }
    this.setUser = this.setUser.bind(this)
  }

  setUser (user) {
    this.setState({ userLoggedIn: user })
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
      headers: { ...getAuthenticationHeader() }
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
        <Header userLoggedIn={userLoggedIn} />
        <Router>
          <Home path='/' userLoggedIn={userLoggedIn} />
          <RegistrationForm path='/register' setUser={this.setUser} />
          <LoginForm path='/login' setUser={this.setUser} />
          <Editor path='/editor/' />
          <Article path='/article/:slug' userLoggedIn={userLoggedIn} />
        </Router>
        <Footer />
      </div>
    )
  }
}
