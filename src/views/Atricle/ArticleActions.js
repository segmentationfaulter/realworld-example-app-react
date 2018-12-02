import React from 'react'

export default function ArticleActions ({ userLoggedIn, postAuthor }) {
  return (
    <div className='article-actions'>
      <div className='article-meta'>
        <a href='profile.html'>
          <img src='http://i.imgur.com/Qr71crq.jpg' />
        </a>
        <div className='info'>
          <a href='' className='author'>Eric Simons</a>
          <span className='date'>January 20th</span>
        </div>

        <button className='btn btn-sm btn-outline-secondary'>
          <i className='ion-plus-round' />
          &nbsp;
          Follow Eric Simons <span className='counter'>(10)</span>
        </button>
        &nbsp;
        <button className='btn btn-sm btn-outline-primary'>
          <i className='ion-heart' />
          &nbsp;
          Favorite Post <span className='counter'>(29)</span>
        </button>
      </div>
    </div>
  )
}
