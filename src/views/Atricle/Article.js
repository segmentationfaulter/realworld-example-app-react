import React from 'react'
import axios from 'axios'

import ArticleBanner from './ArticleBanner'
import ArticleBody from './ArticleBody'
import ArticleActions from './ArticleActions'
import ArticleComments from './ArticleComments'
import { getArticlesUrl, getAuthorFollowingUrl, getArticleFovoritingUrl } from '../../urls'
import { getAuthenticationToken } from '../../lib/authToken'

export default class Article extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      article: null,
      followingRequestInFlight: false,
      favoritingRequestInFlight: false
    }

    this.handleFollowingAuthor = this.handleFollowingAuthor.bind(this)
    this.handleArticleFavoriting = this.handleArticleFavoriting.bind(this)
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

  async handleArticleFavoriting (postAlreadyFavorite) {
    this.setState({ favoritingRequestInFlight: true })
    const { slug } = this.props
    const apiEndpoint = getArticleFovoritingUrl(slug)
    const requestConfig = {
      url: apiEndpoint,
      method: postAlreadyFavorite ? 'delete' : 'post',
      headers: {
        Authorization: `Token ${getAuthenticationToken()}`
      }
    }
    const {
      data: {
        article
      }
    } = await axios(requestConfig)
    this.setState({ article, favoritingRequestInFlight: false })
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

    const articleActionsProps = {
      onFollowingAuthor: this.handleFollowingAuthor,
      onFavoritingPost: this.handleArticleFavoriting,
      followingRequestInFlight,
      userLoggedIn,
      article
    }

    if (!article) return null

    return (
      <div className='article-page'>
        <ArticleBanner
          {...articleActionsProps}
        />
        <div className='container page'>
          <ArticleBody body={article.body} />
          <hr />
          <ArticleActions
            centeralize
            {...articleActionsProps}
          />
          <ArticleComments />
        </div>
      </div>
    )
  }
}
