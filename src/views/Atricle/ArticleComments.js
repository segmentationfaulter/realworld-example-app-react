import React from 'react'
import ArticleCommentEditor from './ArticleCommentEditor'

export default function ArticleComments ({ comments, userLoggedIn, slug, refreshData }) {
  return (
    <div className='row'>
      <div className='col-xs-12 col-md-8 offset-md-2'>
        {userLoggedIn &&
          <ArticleCommentEditor userLoggedIn={userLoggedIn} slug={slug} refreshData={refreshData} />
        }
        <CommentsList comments={comments} />
      </div>
    </div>
  )
}

function CommentsList ({ comments }) {
  function formatDate (dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }
  return (
    <React.Fragment>
      {comments.map((comment) => (
        <div className='card' key={comment.id.toString()}>
          <div className='card-block'>
            <p className='card-text'>
              {comment.body}
            </p>
          </div>
          <div className='card-footer'>
            <a href='' className='comment-author'>
              <img
                src={comment.author.image}
                className='comment-author-img'
              />
            </a>
            &nbsp;
            <a href='' className='comment-author'>{comment.author.username}</a>
            <span className='date-posted'>{formatDate(comment.createdAt)}</span>
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}
