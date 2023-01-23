import { useState } from 'react'

const Blog = ({ blog, currentUser, updateBlog, removeBlog }) => {
  const[visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (event) => {
    event.preventDefault()
    const blogObject = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    updateBlog(blog.id, blogObject)
  }

  const habdleRemove = (event) => {
    event.preventDefault()
    removeBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div className='test-click-details' style={blogStyle}>
      <div className='test-blog' style={hideWhenVisible}>
        {blog.title}
        {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div className='div-details' style={showWhenVisible}>
        <p>{blog.title}</p>
        <p>{blog.author}</p>
        <p>{blog.url}</p>
        {blog.likes}<button onClick={handleLike}>Like</button><br/>
        {blog.user && blog.user.username}
        <button onClick={toggleVisibility}>hide</button>
        {currentUser && currentUser.username === blog.user.username && <button onClick={habdleRemove}>remove</button>}
      </div>
    </div>
  )
}

export default Blog