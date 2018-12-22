import React from 'react'

import { withAPIConnection } from '../../hocs/WithApiConnection'
import { getArticlesUrl } from '../../urls'

class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      body: '',
      tags: ''
    }

    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmission = this.handleFormSubmission.bind(this)
  }

  async handleFormSubmission (submissionEvent) {
    submissionEvent.preventDefault()

    const {
      title,
      description,
      body,
      tags
    } = this.state

    const requestBody = {
      article: {
        title,
        description,
        body,
        tagList: normalizeTags(tags)
      }
    }

    const options = {
      method: 'post',
      url: getArticlesUrl(),
      data: requestBody
    }
    await this.props.handleApiCall(options, () => this.props.navigate(`/article/${this.props.apiResponse.article.slug}`))
  }

  handleFormChange (changeEvent) {
    switch (changeEvent.target.name) {
      case 'title':
        return this.setState({ title: changeEvent.target.value })
      case 'description':
        return this.setState({ description: changeEvent.target.value })
      case 'body':
        return this.setState({ body: changeEvent.target.value })
      case 'tags':
        return this.setState({ tags: changeEvent.target.value })
    }
  }

  render () {
    const {
      title,
      description,
      body,
      tags
    } = this.state

    return (
      <div className='editor-page'>
        <div className='container page'>
          <div className='row'>
            <div className='col-md-10 offset-md-1 col-xs-12'>
              <Form
                title={title}
                description={description}
                body={body}
                tags={tags}
                apiCallInFlight={this.props.apiCallInFlight}
                onChange={this.handleFormChange}
                onSubmit={this.handleFormSubmission}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function Form ({ title, description, body, tags, onChange, onSubmit, apiCallInFlight }) {
  return (
    <form
      onChange={onChange}
      onSubmit={onSubmit}
    >
      <fieldset>
        <fieldset className='form-group'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Article Title'
            name='title'
            value={title}
            required
          />
        </fieldset>
        <fieldset className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder="What's this article about?"
            name='description'
            value={description}
            required
          />
        </fieldset>
        <fieldset className='form-group'>
          <textarea
            className='form-control'
            rows='8'
            placeholder='Write your article (in markdown)'
            name='body'
            value={body}
            required
          />
        </fieldset>
        <fieldset className='form-group'>
          <input
            type='text'
            className='form-control'
            placeholder='Enter tags'
            name='tags'
            value={tags}
          />
          <div className='tag-list' />
        </fieldset>
        <button
          className='btn btn-lg pull-xs-right btn-primary'
          disabled={apiCallInFlight}
          type='submit'
        >
          Publish Article
        </button>
      </fieldset>
    </form>
  )
}

function normalizeTags (tags) {
  return tags.split(',').map((tag) => tag.trim())
}

export default withAPIConnection(Editor)
