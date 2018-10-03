import React from 'react'
import axios from 'axios'
import { getRegistrationUrl, getLoginUrl } from '../../urls'

export default class AccountForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      errorMessage: null
    }

    this.handleFormInputsChange = this.handleFormInputsChange.bind(this)
    this.handleFormSubmission = this.handleFormSubmission.bind(this)
  }

  async handleFormSubmission (submissionEvent) {
    submissionEvent.preventDefault()
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
      const { data } = await axios(requestConfig)
    } catch (err) {
      if (err.response) {
        const errors = err.response.data.errors
        if (errors.username) {
          return this.setState({ errorMessage: `username ${errors.username[0]}` })
        }
        if (errors.email) {
          return this.setState({ errorMessage: `email ${errors.email[0]}` })
        }
        if (errors.password) {
          return this.setState({ errorMessage: `password ${errors.email[0]}` })
        }
        if (errors['email or password']) {
          return this.setState({ errorMessage: `email or password ${errors['email or password'][0]}` })
        }
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
      errorMessage
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

function Form ({ username, email, password, onChange, onSubmit, loginOnly }) {
  return (
    <form onSubmit={onSubmit}>
      {!loginOnly &&
        <fieldset className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='Your username'
            name='username'
            onChange={onChange}
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
          onChange={onChange}
          required
        />
      </fieldset>
      <fieldset className='form-group'>
        <input
          className='form-control form-control-lg'
          type='password'
          placeholder='Password'
          name='password'
          onChange={onChange}
          required
        />
      </fieldset>
      <button className='btn btn-lg btn-primary pull-xs-right'>
        {loginOnly ? 'Sing in' : 'Sign up'}
      </button>
    </form>
  )
}
