import React, { Component } from 'react'
import axios from 'axios'

import { getArticleCommentsUrl } from '../../urls'
import { getAuthenticationHeader } from '../../lib/authToken'

export default class ArticleCommentEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: '',
      apiCallInFlight: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ comment: e.target.value })
  }

  async handleSubmit (e) {
    e.preventDefault()
    this.setState({ apiCallInFlight: true })
    const apiCallOptions = {
      data: {
        comment: {
          body: this.state.comment
        }
      },
      url: getArticleCommentsUrl(this.props.slug),
      method: 'post',
      headers: { ...getAuthenticationHeader() }
    }

    await axios(apiCallOptions)
    this.setState({ apiCallInFlight: false, comment: '' })
    this.props.refreshData()
  }

  render () {
    const {
      userLoggedIn
    } = this.props

    const {
      comment,
      apiCallInFlight
    } = this.state

    return (
      <form
        className='card comment-form'
        onSubmit={this.handleSubmit}
      >
        <div className='card-block'>
          <textarea
            className='form-control'
            placeholder='Write a comment...'
            rows='3'
            value={comment}
            onChange={this.handleChange}
          />
        </div>
        <div className='card-footer'>
          {userLoggedIn.image &&
            <img
              src={userLoggedIn.image}
              className='comment-author-img'
            />
          }
          <button className='btn btn-sm btn-primary' disabled={apiCallInFlight}>Post Comment</button>
        </div>
      </form>
    )
  }
}
