import React from 'react'
import axios from 'axios'
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

      if (!url) {
        throw new Error('You need to provide a valid url key in options parameter')
      }

      if ((method === 'post' || method === 'put') && !data) {
        throw new Error('You need to provide data in options parameter')
      }

      this.setState({ apiCallInFlight: true })

      const requestConfig = {
        url,
        method: method || 'get',
        data,
        headers: {
          ...getAuthenticationHeader()
        }
      }

      const { data: response } = await axios(requestConfig)
      this.setState({ apiCallInFlight: false, apiResponse: response }, () => callback && callback(this.state.apiResponse))
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
