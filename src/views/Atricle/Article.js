import React from 'react'
import axios from 'axios'

import ArticleBanner from './ArticleBanner'
import ArticleContents from './ArticleContents'
import ArticleActions from './ArticleActions'
import ArticleComments from './ArticleComments'
import { getArticlesUrl, getAuthorFollowingUrl } from '../../urls'
import { getAuthenticationToken } from '../../lib/authToken'

export default class Article extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      article: null,
      followingRequestInFlight: false
    }

    this.handleFollowingAuthor = this.handleFollowingAuthor.bind(this)
  }

  async handleFollowingAuthor (authorUsername, followingAuthor) {
    this.setState({ followingRequestInFlight: true })

    const apiEndpoint = getAuthorFollowingUrl(authorUsername)
    const requestConfig = {
      url: apiEndpoint,
      method: followingAuthor ? 'delete' : 'post',
      headers: {
        Authorization: `Token ${getAuthenticationToken()}`
      }
    }

    const {
      data: {
        profile
      }
    } = await axios(requestConfig)

    this.setState((prevState) => {
      prevState.article.author = profile
      return {
        article: prevState.article,
        followingRequestInFlight: false
      }
    })
  }

  async componentDidMount () {
    const article = await this.fetchArticle()
    this.setState({ article })
  }

  async fetchArticle () {
    const { slug } = this.props
    const apiEndpoint = getArticlesUrl(slug)
    const requestConfig = {}
    const authToken = getAuthenticationToken()
    if (authToken) {
      requestConfig.headers = {
        Authorization: `Token ${authToken}`
      }
    }
    const {
      data: {
        article
      }
    } = await axios.get(apiEndpoint, requestConfig)
    return article
  }

  render () {
    const {
      article,
      followingRequestInFlight
    } = this.state

    const { userLoggedIn } = this.props

    return (
      <div className='article-page'>
        <ArticleBanner
          article={article}
          followingRequestInFlight={followingRequestInFlight}
          userLoggedIn={userLoggedIn}
          onFollowingAuthor={this.handleFollowingAuthor}
        />
        <div className='container page'>
          <ArticleContents />
          <hr />
          <ArticleActions
            onFollowingAuthor={this.handleFollowingAuthor}
            followingRequestInFlight={followingRequestInFlight}
            userLoggedIn={userLoggedIn}
            article={article}
            centeralize
          />
          <ArticleComments />
        </div>
      </div>
    )
  }
}
