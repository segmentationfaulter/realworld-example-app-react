import React from 'react'
import { Link } from '@reach/router'

export default function ArticleActions ({
  userLoggedIn,
  article,
  onFollowingAuthor,
  followingRequestInFlight,
  favoritingRequestInFlight,
  onArticleDeletion,
  onFavoritingPost,
  centeralize
}) {
  if (!article) return null
  const {
    slug,
    favoritesCount,
    createdAt,
    favorited,
    author: {
      username: authorUsername,
      image,
      following: followingAuthor
    }
  } = article

  function FirstActionButton () {
    if (userLoggedIn && authorUsername === userLoggedIn.username) {
      return (
        <Link
          className='btn btn-outline-secondary btn-sm'
          to={`/editor/${slug}`}
        >
          <i className='ion-edit' />&nbsp;Edit article
        </Link>
      )
    }

    return (
      <button
        className='btn btn-sm btn-outline-secondary'
        onClick={() => onFollowingAuthor(authorUsername, followingAuthor)}
        disabled={followingRequestInFlight}
      >
        <i className='ion-plus-round' />
        &nbsp;
        {getFollowButtonLabel(followingAuthor, authorUsername)}
      </button>
    )
  }

  function SecondActionButton () {
    if (userLoggedIn && authorUsername === userLoggedIn.username) {
      return (
        <button
          className='btn btn-outline-danger btn-sm'
          onClick={onArticleDeletion}
        >
          <i className='ion-trash-a' />
          &nbsp;
          Delete post
        </button>
      )
    }

    return (
      <button
        className='btn btn-sm btn-outline-primary'
        onClick={() => onFavoritingPost(favorited)}
        disabled={favoritingRequestInFlight}
      >
        <i className='ion-heart' />
        &nbsp;
        {getFavoritePostButtonLabel(favorited)} <span className='counter'>{`(${favoritesCount})`}</span>
      </button>
    )
  }

  return (
    <div className={centeralize ? 'article-actions' : ''}>
      <div className='article-meta'>
        <Link to={`/profile/${authorUsername}`}>
          <img src={image} />
        </Link>
        <div className='info'>
          <a href='' className='author'>{authorUsername}</a>
          <span className='date'>{formatDate(createdAt)}</span>
        </div>

        <FirstActionButton />
        &nbsp;
        <SecondActionButton />
      </div>
    </div>
  )
}

function formatDate (date) {
  return new Date(date).toDateString()
}

function getFollowButtonLabel (followingAuthor, authorUsername) {
  return followingAuthor
    ? `Unfollow ${authorUsername}`
    : `Follow ${authorUsername}`
}

function getFavoritePostButtonLabel (favorited) {
  return favorited
    ? 'Unfavorite post'
    : 'Favorite post'
}
