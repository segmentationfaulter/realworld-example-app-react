import React from 'react'
import axios from 'axios'

import ArticleBanner from './ArticleBanner'
import ArticleContents from './ArticleContents'
import ArticleActions from './ArticleActions'
import ArticleComments from './ArticleComments'
import { getArticlesUrl, getUserFollowingUrl } from '../../urls'
import { getAuthenticationToken } from '../../lib/authToken'

export default class Article extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: null,
      body: null,
      tagList: [],
      authorImageUrl: null,
      createdAt: null,
      favoritesCount: null,
      username: null,
      followingAuthor: null,
      followingRequestInFlight: false
    }

    this.handleFollowingUser = this.handleFollowingUser.bind(this)
  }

  async handleFollowingUser (username, followingAuthor) {
    this.setState({ followingRequestInFlight: true })

    const apiEndpoint = getUserFollowingUrl(username)
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

    this.setState({
      followingAuthor: profile.following,
      followingRequestInFlight: false
    })
  }

  async componentDidMount () {
    const { slug } = this.props
    const apiEndpoint = getArticlesUrl(slug)
    const { data } = await axios.get(apiEndpoint)
    const {
      body,
      createdAt,
      description,
      favorited,
      favoritesCount,
      tagList,
      title,
      author: {
        bio,
        following,
        image,
        username
      }
    } = data.article

    this.setState({
      title,
      body,
      tagList: this.state.tagList.concat(tagList),
      authorImageUrl: image,
      createdAt,
      favoritesCount,
      username,
      followingAuthor: following
    })
  }

  render () {
    const {
      title,
      body,
      tagList,
      authorImageUrl,
      createdAt,
      favoritesCount,
      username,
      followingAuthor,
      followingRequestInFlight
    } = this.state

    return (
      <div className='article-page'>
        <ArticleBanner
          title={title}
          authorImageUrl={authorImageUrl}
          createdAt={createdAt}
          favoritesCount={favoritesCount}
          username={username}
          onFollowingUser={this.handleFollowingUser}
          followingAuthor={followingAuthor}
          followingRequestInFlight={followingRequestInFlight}
        />
        <div className='container page'>
          <ArticleContents />
          <hr />
          <ArticleActions />
          <ArticleComments />
        </div>
      </div>
    )
  }
}
