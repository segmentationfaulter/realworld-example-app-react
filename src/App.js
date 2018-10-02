import React from 'react'
import { Router } from '@reach/router'

import Register from './views/Register'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <Router>
          <Register path='/register' />
        </Router>
      </div>
    )
  }
}
