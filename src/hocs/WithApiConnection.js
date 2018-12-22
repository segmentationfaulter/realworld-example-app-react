import React from 'react'
import axios from 'axios'
import invariant from 'invariant'
import { getAuthenticationHeader } from '../lib/authToken'

export function withAPIConnection (WrappedComponent) {
  return class WithAPIConnection extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        apiCallInFlight: false,
        apiResponse: null
      }

      this.handleApiCall = this.handleApiCall.bind(this)
    }

    async handleApiCall (apiCallOptions, callback) {
      const {
        url,
        method,
        data
      } = apiCallOptions

      invariant(url, 'You need to provide a valid url key in options parameter')
      invariant((method === 'post' || method === 'put') && data, 'You need to provide data in options parameter')

      this.setState({ apiCallInFlight: true })

      const requestConfig = {
        url,
        method: method || 'get',
        data,
        headers: {
          ...getAuthenticationHeader()
        }
      }

      try {
        const { data: response } = await axios(requestConfig)
        this.setState({ apiCallInFlight: false, apiResponse: response }, () => callback && callback(this.state.apiResponse))
      } catch (err) {
        this.setState({ apiCallInFlight: false })
        throw err
      }
    }

    render () {
      const { apiCallInFlight, apiResponse } = this.state

      return (
        <WrappedComponent
          handleApiCall={this.handleApiCall}
          apiCallInFlight={apiCallInFlight}
          apiResponse={apiResponse}
          {...this.props}
        />
      )
    }
  }
}
