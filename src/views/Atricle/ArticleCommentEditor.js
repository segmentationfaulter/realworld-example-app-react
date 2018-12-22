import React, { Component } from 'react'

import { withAPIConnection } from '../../hocs/WithApiConnection'
import { getArticleCommentsUrl } from '../../urls'

class ArticleCommentEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comment: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    this.setState({ comment: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()
    const apiCallOptions = {
      data: {
        comment: {
          body: this.state.comment
        }
      },
      url: getArticleCommentsUrl(this.props.slug),
      method: 'post'
    }
    this.props.handleApiCall(apiCallOptions)
  }

  render () {
    const {
      userLoggedIn,
      apiCallInFlight
    } = this.props

    const {
      comment
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

export default withAPIConnection(ArticleCommentEditor)
