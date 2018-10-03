import React from 'react'
import { Router } from '@reach/router'

import RegistrationForm from './views/RegistrationForm'
import LoginForm from './views/LoginForm'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <RegistrationForm path='/register' />
          <LoginForm path='/login' />
        </Router>
      </div>
    )
  }
}
