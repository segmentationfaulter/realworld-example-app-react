import React from 'react'
import axios from 'axios'
import cn from 'classnames'
import { getArticlesUrl, getFeedArticlesUrl, getTagsListUrl } from '../../urls'
import { getAuthenticationHeader } from '../../lib/authToken'
import ArticlesPreview from './ArticlesPreview'

const DEFAULT_FEEDS = {
  global: 'global',
  personal: 'personal'
}

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tags: [],
      feeds: [
        { label: 'My Feed', id: DEFAULT_FEEDS.personal, articles: null },
        { label: 'Global Feed', id: DEFAULT_FEEDS.global, articles: null }
      ],
      selectedFeedId: 'global'
    }

    this.handleFeedChange = this.handleFeedChange.bind(this)
    this.handleTagClick = this.handleTagClick.bind(this)
  }

  async fetchSelectedFeedArticles () {
    const { selectedFeedId } = this.state
    const requestConfig = {}
    let url

    if (selectedFeedId === DEFAULT_FEEDS.global) {
      url = getArticlesUrl()
    } else if (selectedFeedId === DEFAULT_FEEDS.personal) {
      url = getFeedArticlesUrl()
      requestConfig.headers = { ...getAuthenticationHeader() }
    } else {
      url = getArticlesUrl(undefined, `tag=${selectedFeedId}`)
    }

    const { data: { articles } } = await axios.get(url, requestConfig)

    this.setState((prevState) => {
      const targetFeedIndex = prevState.feeds.findIndex((feed) => feed.id === selectedFeedId)
      prevState.feeds[targetFeedIndex].articles = articles
      return {
        feeds: prevState.feeds
      }
    })
  }

  handleTagClick (e, tag) {
    e.preventDefault()
    const tagFeed = {
      label: `#${tag}`,
      id: tag,
      articles: null
    }

    this.setState({
      feeds: this.state.feeds.concat([tagFeed]),
      selectedFeedId: tag
    })
  }

  async fetchTagsList () {
    const {
      data: { tags }
    } = await axios.get(getTagsListUrl())
    this.setState({ tags })
  }

  renderArticlePreviews () {
    const {
      selectedFeedId,
      feeds
    } = this.state

    const [{ articles }] = feeds.filter(feed => feed.id === selectedFeedId)

    if (articles === null) {
      return <div className='article-preview'>Loading...</div>
    }

    return (
      <ArticlesPreview
        articles={articles}
      />
    )
  }

  handleFeedChange (e, selectedFeedId) {
    e.preventDefault()
    if (!this.props.userLoggedIn && selectedFeedId === 'personal') return
    this.setState({ selectedFeedId })
  }

  componentDidMount () {
    this.fetchSelectedFeedArticles()
    this.fetchTagsList()
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.selectedFeedId !== prevState.selectedFeedId) {
      const [selectedFeed] = this.state.feeds.filter((feed) => feed.id === this.state.selectedFeedId)
      if (selectedFeed.articles) return
      this.fetchSelectedFeedArticles()
    }
  }

  render () {
    const { selectedFeedId, tags, feeds } = this.state

    const { userLoggedIn } = this.props

    return (
      <div className='home-page'>
        <Banner />
        <div className='container page'>
          <div className='row'>
            <div className='col-md-9'>
              <FeedToggle
                feeds={feeds}
                onFeedChange={this.handleFeedChange}
                selectedFeedId={selectedFeedId}
                userLoggedIn={userLoggedIn}
              />
              {this.renderArticlePreviews()}
            </div>
            <div className='col-md-3'>
              <Sidebar tags={tags} onTagClick={this.handleTagClick} />
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

function FeedToggle ({ feeds, onFeedChange, selectedFeedId, userLoggedIn }) {
  const getClasses = currentFeed =>
    cn(
      'nav-link',
      { active: currentFeed.id === selectedFeedId },
      { disabled: !userLoggedIn && (currentFeed.id === 'personal') }
    )

  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        {feeds.map(feed => (
          <li
            className='nav-item'
            onClick={e => onFeedChange(e, feed.id)}
            key={feed.id}
          >
            <a className={getClasses(feed)} href=''>
              {feed.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Sidebar ({ tags, onTagClick }) {
  return (
    <div className='sidebar'>
      <p>Popular Tags</p>

      <div className='tag-list'>
        {tags.map(tag => (
          <a href='' className='tag-pill tag-default' key={tag} onClick={(e) => onTagClick(e, tag)}>
            {tag}
          </a>
        ))}
      </div>
    </div>
  )
}
