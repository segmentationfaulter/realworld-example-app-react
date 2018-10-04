import React from 'react'
import { Router } from '@reach/router'

import RegistrationForm from './views/RegistrationForm'
import LoginForm from './views/LoginForm'
import Home from './views/Home'
import Editor from './views/Editor'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <Home path='/' />
          <RegistrationForm path='/register' />
          <LoginForm path='/login' />
          <Editor path='/editor' />
        </Router>
      </div>
    )
  }
}
