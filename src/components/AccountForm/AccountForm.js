import React from 'react'

export default class AccountForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      errorMessage: null
    }

    this.handleFormInputsChange = this.handleFormInputsChange.bind(this)
  }

  handleFormInputsChange (changeEvent) {
    switch (changeEvent.target.name) {
      case 'name':
        return this.setState({ name: changeEvent.target.value })
      case 'email':
        return this.setState({ email: changeEvent.target.value })
      case 'password':
        return this.setState({ password: changeEvent.target.value })
    }
  }

  render () {
    const { loginOnly } = this.props
    const {
      name,
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
                name={name}
                email={email}
                password={password}
                loginOnly={loginOnly}
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

function Form ({ name, email, password, onChange, onSubmit, loginOnly }) {
  return (
    <form onSubmit={onSubmit}>
      {!loginOnly &&
        <fieldset className='form-group'>
          <input
            className='form-control form-control-lg'
            type='text'
            placeholder='Your Name'
            name='name'
            onChange={onChange}
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
        />
      </fieldset>
      <fieldset className='form-group'>
        <input
          className='form-control form-control-lg'
          type='password'
          placeholder='Password'
          name='password'
          onChange={onChange}
        />
      </fieldset>
      <button className='btn btn-lg btn-primary pull-xs-right'>
        {loginOnly ? 'Sing in' : 'Sign up'}
      </button>
    </form>
  )
}
