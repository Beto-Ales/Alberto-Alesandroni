import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const[title, setTitle] = useState('')
  // const[author, setAuthor] = useState('')
  // const[url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // const handleLogin = async (event) => {
  const handleLogin = async (loginObject) => {
    // event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      // const user = await loginService.login({
      //   username, password,
      // })
      const user = await loginService.login(loginObject)
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      setUser(user)
      // setUsername('')
      // setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const createBlog = (blogObject) => {
    // event.preventDefault()

    // console.log(user)

    // const newBlog = {
    //   title: title,
    //   author: author,
    //   url: url,
    //   // likes: likes,
    //   // user: user.id
    // }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        // setTitle('')
        // setAuthor('')
        // setUrl('')
        setErrorMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'green')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const updateBlog = async (id, blogObject) => {
    // const updatedBlog = await blogService.update(id, blogObject)
    // find the old blog & replace it with the updated one
    await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => {
      if (blog.id === id) {
        blog.likes = blog.likes + 1
      }
      return blog
    }))
    setErrorMessage('Blog updated', 'green')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const removeBlog = async (id) => {
    const blogToBeRemoved = blogs.find(blog => blog.id === id)
    let confirm = false
    if (window.confirm(`Remove ${blogToBeRemoved.title} by ${blogToBeRemoved.author}`)) {
      confirm = true
    }
    confirm && await blogService.remove(id)
    confirm && setBlogs(blogs.filter(blog => blog.id !== id))
    confirm && setErrorMessage('Blog removed')
    confirm && setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  // const loginForm = () => (
  //   <form onSubmit={handleLogin}>
  //     <div>
  //       username
  //         <input
  //         type="text"
  //         value={username}
  //         name="Username"
  //         onChange={({ target }) => setUsername(target.value)}
  //       />
  //     </div>
  //     <div>
  //       password
  //         <input
  //         type="password"
  //         value={password}
  //         name="Password"
  //         onChange={({ target }) => setPassword(target.value)}
  //       />
  //     </div>
  //     <button type="submit">login</button>
  //   </form>
  // )

  // const blogForm = () => (
  //   <form onSubmit={addBlog}>
  //     <div>
  //       <h3>Create new</h3>

  //       title:
  //       <input
  //         type="text"
  //         value={title}
  //         name="Title"
  //         onChange={({ target }) => setTitle(target.value)}
  //       />

  //       author:
  //       <input
  //         type="text"
  //         value={author}
  //         name="Author"
  //         onChange={({ target }) => setAuthor(target.value)}
  //       />

  //       url:
  //       <input
  //         type="text"
  //         value={url}
  //         name="Url"
  //         onChange={({ target }) => setUrl(target.value)}
  //       />
  //     </div>
  //     <button type="submit">create</button>
  //   </form>
  // )

  const displayBlogs = () => (
    <div>
      {/* {console.log(blogs)}
      {console.log(user._id)} */}
      {/* {console.log(blogs)} */}
      <p>display blogs</p>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => {
        // blog.user && console.log(blog.user.id)    // blog.user.id
          return <Blog key={blog.id} blog={blog} currentUser={user} updateBlog={updateBlog} removeBlog={removeBlog} />
        }
        )}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={errorMessage} />

      {user === null ?
        // loginForm() :
        // <Togglable buttonLabel="Log in">
        <LoginForm
          handleLogin={handleLogin}
          // username={username}
          // setUsername={setUsername}
          // password={password}
          // setPassword={setPassword}
        /> :
        // </Togglable> :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Log out</button>
          <Togglable buttonLabel="Create blog">
            <BlogForm
              createBlog={createBlog}
              // title={title}
              // setTitle={setTitle}
              // author={author}
              // setAuthor={setAuthor}
              // url={url}
              // setUrl={setUrl}
            />
          </Togglable>
          <Togglable buttonLabel="fix button label">buttonLabel forgotten... </Togglable>
          {displayBlogs()}
        </div>
      }

      {/* <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
      /> */}

      {/* <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
         <div>
            password
              <input
                type="password"
                value={password}
                name="Password" onChange={({ target }) => setPassword(target.value)}
              />
          </div>
          <button type="submit">login</button>
      </form> */}

      {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
    </div>
  )
}

export default App