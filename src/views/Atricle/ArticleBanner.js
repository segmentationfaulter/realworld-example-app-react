import React from 'react'
import { Link } from '@reach/router'

export default function ArticleBanner ({
  title,
  authorImageUrl,
  username,
  createdAt,
  favoritesCount,
  onFollowingUser,
  onFavoringPost,
  followingAuthor,
  followingRequestInFlight
}) {
  const profilePagePath = `/profile/:${username}`

  return (
    <div className='banner'>
      <div className='container'>

        <h1>{title}</h1>

        <div className='article-meta'>
          <Link to={profilePagePath}><img src={authorImageUrl} /></Link>
          <div className='info'>
            <Link to={profilePagePath} className='author'>{username}</Link>
            <span className='date'>{formatDate(createdAt)}</span>
          </div>
          <button
            className='btn btn-sm btn-outline-secondary'
            onClick={() => onFollowingUser(username, followingAuthor)}
            disabled={followingRequestInFlight}
          >
            <i className='ion-plus-round' />
            {getFollowButtonLabel(followingAuthor, username)}
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

function getFollowButtonLabel (followingAuthor, username) {
  return followingAuthor
    ? `Unfollow ${username}`
    : `Follow ${username}`
}

function formatDate (date) {
  return new Date(date).toDateString()
}
