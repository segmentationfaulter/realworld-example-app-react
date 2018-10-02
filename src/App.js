import React from 'react'
import { Router } from '@reach/router'

import RegistrationForm from './views/RegistrationForm'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <RegistrationForm path='/register' />
        </Router>
      </div>
    )
  }
}
