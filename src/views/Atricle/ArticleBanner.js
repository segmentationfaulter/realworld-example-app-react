import React from 'react'
import { Link } from '@reach/router'

export default function ArticleBanner ({
  article,
  onFollowingUser,
  onFavoringPost,
  followingRequestInFlight
}) {
  if (!article) return null
  const {
    title,
    createdAt,
    favoritesCount,
    author: {
      username: authorUsername,
      image,
      following: followingAuthor
    }
  } = article
  const profilePagePath = `/profile/:${authorUsername}`

  return (
    <div className='banner'>
      <div className='container'>

        <h1>{title}</h1>

        <div className='article-meta'>
          <Link to={profilePagePath}><img src={image} /></Link>
          <div className='info'>
            <Link to={profilePagePath} className='author'>{authorUsername}</Link>
            <span className='date'>{formatDate(createdAt)}</span>
          </div>
          <button
            className='btn btn-sm btn-outline-secondary'
            onClick={() => onFollowingUser(authorUsername, followingAuthor)}
            disabled={followingRequestInFlight}
          >
            <i className='ion-plus-round' />
            {getFollowButtonLabel(followingAuthor, authorUsername)}
          </button>
          &nbsp;&nbsp;
          <button className='btn btn-sm btn-outline-primary'>
            <i className='ion-heart' />
            &nbsp;
            Favorite Post <span className='counter'>{`(${favoritesCount})`}</span>
          </button>
        </div>

      </div>
    </div>
  )
}

function getFollowButtonLabel (followingAuthor, authorUsername) {
  return followingAuthor
    ? `Unfollow ${authorUsername}`
    : `Follow ${authorUsername}`
}

function formatDate (date) {
  return new Date(date).toDateString()
}
