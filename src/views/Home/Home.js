import React from 'react'
import axios from 'axios'
import { getArticlesUrl } from '../../urls'
import { getAuthenticationHeader } from '../../lib/authToken'
import ArticlesPreview from './ArticlesPreview'

export default class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      globalFeed: null,
      globalFeedFetched: false
    }
  }

  async fetchGlobalFeedArticles () {
    const { data: { articles } } = await axios.get(getArticlesUrl())
    this.setState({ globalFeed: articles, globalFeedFetched: true })
  }

  renderGlobalFeed () {
    const {
      globalFeed,
      globalFeedFetched
    } = this.state

    if (!globalFeedFetched) {
      return <div className='article-preview'>Loading...</div>
    }
    return (
      <ArticlesPreview
        articles={globalFeed}
      />
    )
  }

  async componentDidMount () {
    await this.fetchGlobalFeedArticles()
  }

  render () {
    return (
      <div className='home-page'>
        <Banner />
        <div className='container page'>
          <div className='row'>
            <div className='col-md-9'>
              <FeedToggle />
              {this.renderGlobalFeed()}
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

function FeedToggle () {
  return (
    <div className='feed-toggle'>
      <ul className='nav nav-pills outline-active'>
        <li className='nav-item'>
          <a className='nav-link disabled' href=''>
            Your Feed
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link active' href=''>
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
