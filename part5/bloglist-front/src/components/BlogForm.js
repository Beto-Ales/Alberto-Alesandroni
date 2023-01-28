import React from 'react'
import { useState } from 'react'

// const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
const BlogForm = ({ createBlog }) => {
  const[title, setTitle] = useState('')
  const[author, setAuthor] = useState('')
  const[url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        <h3>Create new</h3>

          title:
        <input
          id='title'
          type="text"
          value={title}
          name="Title"
          placeholder='title'
          onChange={({ target }) => setTitle(target.value)}
        />

          author:
        <input
          id='author'
          type="text"
          value={author}
          name="Author"
          placeholder='author'
          onChange={({ target }) => setAuthor(target.value)}
        />

          url:
        <input
          id='url'
          type="text"
          value={url}
          name="Url"
          placeholder='url'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm