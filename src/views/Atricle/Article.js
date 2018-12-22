import React from 'react'
import axios from 'axios'

import ArticleBanner from './ArticleBanner'
import ArticleBody from './ArticleBody'
import ArticleActions from './ArticleActions'
import ArticleComments from './ArticleComments'
import { getArticlesUrl, getAuthorFollowingUrl, getArticleFovoritingUrl, getArticleCommentsUrl } from '../../urls'
import { getAuthenticationToken } from '../../lib/authToken'

export default class Article extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      article: null,
      comments: null,
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
    const { article, comments } = await this.fetchArticle()
    this.setState({ article, comments })
  }

  async fetchArticle () {
    const { slug } = this.props
    const articleUrl = getArticlesUrl(slug)
    const commentsUrl = getArticleCommentsUrl(slug)
    const requestConfig = {}
    const authToken = getAuthenticationToken()
    if (authToken) {
      requestConfig.headers = {
        Authorization: `Token ${authToken}`
      }
    }
    const articlePromise = axios.get(articleUrl, requestConfig)
    const commentsPromise = axios.get(commentsUrl, requestConfig)

    const { data: { article } } = await articlePromise
    const { data: { comments } } = await commentsPromise

    return {
      article,
      comments
    }
  }

  render () {
    const {
      article,
      followingRequestInFlight,
      favoritingRequestInFlight,
      comments
    } = this.state

    const { userLoggedIn } = this.props

    const articleActionsProps = {
      onFollowingAuthor: this.handleFollowingAuthor,
      onFavoritingPost: this.handleArticleFavoriting,
      followingRequestInFlight,
      favoritingRequestInFlight,
      userLoggedIn,
      article
    }

    if (!article || !comments) return null

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
          <ArticleComments
            comments={comments}
          />
        </div>
      </div>
    )
  }
}
