import React from 'react'

import ArticleActions from '../Atricle/ArticleActions'

export default function ArticleBanner ({
  article,
  onFollowingAuthor,
  onFavoringPost,
  followingRequestInFlight,
  favoritingRequestInFlight,
  userLoggedIn,
  onFavoritingPost
}) {
  if (!article) return null
  return (
    <div className='banner'>
      <div className='container'>
        <h1>{article.title}</h1>
        <ArticleActions
          userLoggedIn={userLoggedIn}
          article={article}
          followingRequestInFlight={followingRequestInFlight}
          favoritingRequestInFlight={favoritingRequestInFlight}
          onFollowingAuthor={onFollowingAuthor}
          onFavoritingPost={onFavoritingPost}
        />
      </div>
    </div>
  )
}
