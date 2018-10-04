import React from 'react'
import axios from 'axios'
import { render, fireEvent } from 'react-testing-library'

import Editor from '../views/Editor'
import { getArticlesUrl } from '../urls'
import { setAuthenticationToken, getAuthenticationToken } from '../lib/authToken'

jest.mock('axios')

test('Article submission works', () => {
  const { getByPlaceholderText, container } = render(<Editor />)
  setAuthenticationToken('secret')

  const form = container.querySelector('form')
  const submitButton = container.querySelector('button')
  const titleField = getByPlaceholderText(/title/i)
  const descriptionField = getByPlaceholderText(/about/i)
  const bodyField = getByPlaceholderText(/markdown/i)
  const tagsField = getByPlaceholderText(/tags/i)

  const titleChangeEvent = {
    target: {
      value: 'title'
    }
  }
  const descriptionChangeEvent = {
    target: {
      value: 'desc'
    }
  }
  const bodyChangeEvent = {
    target: {
      value: 'body'
    }
  }
  const tagsChangeEvent = {
    target: {
      value: 'mary  ,  saqib   '
    }
  }

  const requestConfig = {
    method: 'post',
    url: getArticlesUrl(),
    data: {
      article: {
        title: titleChangeEvent.target.value,
        description: descriptionChangeEvent.target.value,
        body: bodyChangeEvent.target.value,
        tagList: ['mary', 'saqib']
      }
    },
    headers: {
      'Authorization': `Token ${getAuthenticationToken()}`
    }
  }

  fireEvent.change(titleField, titleChangeEvent)
  fireEvent.change(descriptionField, descriptionChangeEvent)
  fireEvent.change(bodyField, bodyChangeEvent)
  fireEvent.change(tagsField, tagsChangeEvent)

  expect(titleField.value).toBe(titleChangeEvent.target.value)
  expect(descriptionField.value).toBe(descriptionChangeEvent.target.value)
  expect(bodyField.value).toBe(bodyChangeEvent.target.value)
  expect(tagsField.value).toBe(tagsChangeEvent.target.value)
  expect(submitButton.hasAttribute('disabled')).toBeFalsy()

  fireEvent.submit(form)

  expect(submitButton.hasAttribute('disabled')).toBeTruthy()
  expect(axios).toHaveBeenCalledTimes(1)
  expect(axios).toHaveBeenCalledWith(requestConfig)
})
