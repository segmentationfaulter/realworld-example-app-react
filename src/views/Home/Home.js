import React from 'react'
import axios from 'axios'
import cn from 'classnames'
import { getArticlesUrl, getFeedArticlesUrl } from '../../urls'
import { getAuthenticationHeader } from '../../lib/authToken'
import ArticlesPreview from './ArticlesPreview'

const FEEDS = {
  global: 'global',
  personal: 'personal'
}

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      globalFeed: null,
      personalFeed: null,
      articlesFetched: false,
      selectedFeed: FEEDS.global
    }

    this.handleFeedChange = this.handleFeedChange.bind(this)
  }

  async fetchArticles () {
    const globalFeedPromise = axios.get(getArticlesUrl())
    const personalFeedPromise = axios.get(getFeedArticlesUrl(), {
      headers: { ...getAuthenticationHeader() }
    })
    const { data: {
      articles: globalFeed
    } } = await globalFeedPromise
    const { data: {
      articles: personalFeed
    } } = await personalFeedPromise
    this.setState({ globalFeed, personalFeed, articlesFetched: true })
  }

  renderArticlePreviews () {
    const {
      selectedFeed,
      articlesFetched,
      globalFeed,
      personalFeed
    } = this.state

    if (!articlesFetched) {
      return <div className='article-preview'>Loading...</div>
    }
    return (
      <ArticlesPreview
        articles={selectedFeed === FEEDS.global ? globalFeed : personalFeed}
      />
    )
  }

  handleFeedChange (e, feed) {
    e.preventDefault()
    if (!this.props.userLoggedIn && feed === FEEDS.personal) return
    this.setState({ selectedFeed: feed })
  }

  async componentDidMount () {
    await this.fetchArticles()
  }

  render () {
    const {
      selectedFeed
    } = this.state

    const { userLoggedIn } = this.props

    return (
      <div className='home-page'>
        <Banner />
        <div className='container page'>
          <div className='row'>
            <div className='col-md-9'>
              <FeedToggle
                onFeedChange={this.handleFeedChange}
                selectedFeed={selectedFeed}
                userLoggedIn={userLoggedIn}
              />
              {this.renderArticlePreviews()}
            </div>
            <div className='col-md-3'>
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function Banner () {
  return (
    <div className='banner'>
      <div className='container'>
        <h1 className='logo-font'>conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  )
}

function FeedToggle ({ onFeedChange, selectedFeed, userLoggedIn }) {
  const getClasses = (currentFeed) => cn('nav-link',
    { 'active': currentFeed === selectedFeed },
    { 'disabled': !userLoggedIn && (currentFeed === FEEDS.personal) }
  )

  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item' onClick={(e) => onFeedChange(e, FEEDS.personal)}>
          <a className={getClasses(FEEDS.personal)} href=''>
            Your Feed
          </a>
        </li>
        <li className='nav-item' onClick={(e) => onFeedChange(e, FEEDS.global)}>
          <a className={getClasses(FEEDS.global)} href=''>
            Global Feed
          </a>
        </li>
      </ul>
    </div>
  )
}

function Sidebar () {
  return (
    <div className='sidebar'>
      <p>Popular Tags</p>

      <div className='tag-list'>
        <a href='' className='tag-pill tag-default'>
          programming
        </a>
        <a href='' className='tag-pill tag-default'>
          javascript
        </a>
        <a href='' className='tag-pill tag-default'>
          emberjs
        </a>
        <a href='' className='tag-pill tag-default'>
          angularjs
        </a>
        <a href='' className='tag-pill tag-default'>
          react
        </a>
        <a href='' className='tag-pill tag-default'>
          mean
        </a>
        <a href='' className='tag-pill tag-default'>
          node
        </a>
        <a href='' className='tag-pill tag-default'>
          rails
        </a>
      </div>
    </div>
  )
}
