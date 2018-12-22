import React from 'react'

export default function ArticleBody ({ body }) {
  return (
    <div className='row article-content'>
      <div className='col-md-12'>{body}</div>
    </div>
  )
}
