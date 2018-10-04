import React from 'react'
import axios from 'axios'
import AccountForm from '../components/AccountForm'
import { getAuthenticationToken } from '../lib/authToken'
import { getRegistrationUrl } from '../urls'
import { render, fireEvent, wait } from 'react-testing-library'

jest.mock('axios')

test('Account form works', async () => {
  const apiResponse = {
    data: {
      user: {
        token: '123'
      }
    }
  }
  axios.mockImplementation(() => Promise.resolve(apiResponse))

  const { getByPlaceholderText, container } = render(<AccountForm />)
  const form = container.querySelector('form')
  const usernameField = getByPlaceholderText(/username/i)
  const emailField = getByPlaceholderText(/email/i)
  const passwordField = getByPlaceholderText(/password/i)

  const usernameFieldChangeEventValue = {
    target: {
      value: 'saqib'
    }
  }
  const emailFieldChangeEventValue = {
    target: {
      value: 'abc@example.com'
    }
  }
  const passwordFieldChangeEventValue = {
    target: {
      value: 'secret'
    }
  }

  fireEvent.change(usernameField, usernameFieldChangeEventValue)
  fireEvent.change(emailField, emailFieldChangeEventValue)
  fireEvent.change(passwordField, passwordFieldChangeEventValue)

  expect(usernameField.value).toBe(usernameFieldChangeEventValue.target.value)
  expect(emailField.value).toBe(emailFieldChangeEventValue.target.value)
  expect(passwordField.value).toBe(passwordFieldChangeEventValue.target.value)

  fireEvent.submit(form)
  expect(axios).toHaveBeenCalled()
  expect(axios).toHaveBeenCalledTimes(1)
  expect(axios).toHaveBeenCalledWith({
    url: getRegistrationUrl(),
    method: 'post',
    data: {
      user: {
        username: usernameFieldChangeEventValue.target.value,
        email: emailFieldChangeEventValue.target.value,
        password: passwordFieldChangeEventValue.target.value
      }
    }
  })
  expect(axios()).resolves.toBe(apiResponse)
  await wait(() => expect(getAuthenticationToken()).not.toBeNull())
  expect(getAuthenticationToken()).toBe(apiResponse.data.user.token)
})
