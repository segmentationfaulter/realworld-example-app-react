import React from 'react'
import { Link } from '@reach/router'

const ArticlesPreview = ({ articles }) => {
  const getProfileUrl = (article) => `/profile/${article.author.username}`
  return (
    <React.Fragment>
      {articles.map((article) => {
        return (
          <div className='article-preview' key={article.slug}>
            <div className='article-meta'>
              <Link to={getProfileUrl(article)}>
                <img src={article.author.image} />
              </Link>
              <div className='info'>
                <Link to={getProfileUrl(article)} className='author'>
                  {article.author.username}
                </Link>
                <span className='date'>January 20th</span>
              </div>
              <button className='btn btn-outline-primary btn-sm pull-xs-right'>
                <i className='ion-heart' /> {article.favoritesCount}
              </button>
            </div>
            <Link to={`/article/${article.slug}`} className='preview-link'>
              <h1>{article.title}</h1>
              <p>{article.description}</p>
              <span>Read more...</span>
            </Link>
          </div>
        )
      })}
    </React.Fragment>
  )
}
export default ArticlesPreview
