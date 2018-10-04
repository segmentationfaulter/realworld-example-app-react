import React from 'react'
import { Router } from '@reach/router'

import RegistrationForm from './views/RegistrationForm'
import LoginForm from './views/LoginForm'
import Home from './views/Home'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <RegistrationForm path='/register' />
          <LoginForm path='/login' />
          <Home path='/' />
        </Router>
      </div>
    )
  }
}
