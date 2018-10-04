import React from 'react'
import axios from 'axios'

import { getRegistrationUrl, getLoginUrl } from '../../urls'
import { setAuthenticationToken } from '../../lib/authToken'

export default class AccountForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errorMessage: null,
      apiRequestInFlight: false
    }

    this.handleFormInputsChange = this.handleFormInputsChange.bind(this)
    this.handleFormSubmission = this.handleFormSubmission.bind(this)
  }

  async handleFormSubmission (submissionEvent) {
    submissionEvent.preventDefault()
    this.setState({ apiRequestInFlight: true })
    const { loginOnly } = this.props
    const { email, password, username } = this.state

    const requestBody = {
      user: {
        email,
        password
      }
    }
    if (!loginOnly) {
      requestBody.user.username = username
    }

    const requestConfig = {
      url: loginOnly ? getLoginUrl() : getRegistrationUrl(),
      method: 'post',
      data: requestBody
    }

    try {
      var { data: response } = await axios(requestConfig)
      setAuthenticationToken(response.user.token)
      this.props.navigate('/')
    } catch (err) {
      if (err.response) {
        const errors = err.response.data.errors
        return this.handleHTTPError(errors)
      } else {
        return this.setState({ errorMessage: 'I do not know what went wrong' })
      }
    }
  }

  handleHTTPError (errors) {
    for (let pointOfError in errors) {
      if (errors.hasOwnProperty(pointOfError)) {
        return this.setState({
          errorMessage: `${pointOfError} ${errors[pointOfError][0]}`,
          apiRequestInFlight: false
        })
      }
    }
  }

  handleFormInputsChange (changeEvent) {
    switch (changeEvent.target.name) {
      case 'username':
        return this.setState({ username: changeEvent.target.value })
      case 'email':
        return this.setState({ email: changeEvent.target.value })
      case 'password':
        return this.setState({ password: changeEvent.target.value })
    }
  }

  render () {
    const { loginOnly } = this.props
    const {
      username,
      email,
      password,
      errorMessage,
      apiRequestInFlight
    } = this.state

    return (
      <div className='auth-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-6 offset-md-3 col-xs-12'>
              <FormHeading loginOnly={loginOnly} />
              <AccountMessage loginOnly={loginOnly} />
              <ErrorMessage message={errorMessage} />
              <Form
                onChange={this.handleFormInputsChange}
                username={username}
                email={email}
                password={password}
                loginOnly={loginOnly}
                onSubmit={this.handleFormSubmission}
                apiRequestInFlight={apiRequestInFlight}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function FormHeading ({ loginOnly }) {
  return <h1 className='text-xs-center'>{loginOnly ? 'Sign in' : 'Sign up'}</h1>
}

function AccountMessage ({ loginOnly }) {
  return (
    <p className='text-xs-center'>
      <a href=''>{loginOnly ? 'Need an account?' : 'Have an account?'}</a>
    </p>
  )
}

function ErrorMessage ({ message }) {
  if (!message) return null
  return (
    <ul className='error-messages'>
      <li>{message}</li>
    </ul>
  )
}

function Form ({ username, email, password, onChange, onSubmit, loginOnly, apiRequestInFlight }) {
  return (
    <form onSubmit={onSubmit} onChange={onChange}>
      {!loginOnly &&
        <fieldset className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='Your username'
            name='username'
            required
          />
        </fieldset>
      }
      <fieldset className='form-group'>
        <input
          className='form-control form-control-lg'
          type='email'
          placeholder='Email'
          name='email'
          required
        />
      </fieldset>
      <fieldset className='form-group'>
        <input
          className='form-control form-control-lg'
          type='password'
          placeholder='Password'
          name='password'
          required
        />
      </fieldset>
      <button
        className='btn btn-lg btn-primary pull-xs-right'
        disabled={apiRequestInFlight}
      >
        {loginOnly ? 'Sing in' : 'Sign up'}
      </button>
    </form>
  )
}
