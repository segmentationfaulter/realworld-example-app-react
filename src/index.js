import React from 'react'
import ReactDOM from 'react-dom'

const element = React.createElement('p', {}, 'hello world')

ReactDOM.render(element, document.getElementById('root'))
