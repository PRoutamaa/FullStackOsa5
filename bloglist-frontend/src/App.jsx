import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoggedIn from './components/LoggedIn'
import blogService from './services/blogs'
import loginService from './services/login'
import LogOutButton from './components/LogOutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username of password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
    console.log('logged out')
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.createNewBlog(newBlog)
    console.log(returnedBlog)
    setBlogs(blogs.concat(returnedBlog))
    setTitle(returnedBlog.title)
    setAuthor(returnedBlog.author)
    setTimeout(() => {
      setAuthor('')
      setTitle('')
    }, 5000)
  }

  const updateBlog = async (curBlog) => {
    const updatedBlog = {
      ...curBlog,
      ['likes']: curBlog.likes + 1
    }
    console.log(updatedBlog)
    const blog = await blogService.updateBlog(updatedBlog.id, updatedBlog)
    console.log(blog)
    setBlogs(curBlogs => curBlogs.map(curBlog => curBlog.id === blog.id ? blog : curBlog))
  }

  const deleteBlog = async (blog) => {
    console.log(blog.id)
    const confirm = window.confirm(`Delete this blog: ${blog.title} by ${blog.author}`)
    if (confirm) {
      await blogService.deleteBlog(blog.id)
      setBlogs(blogs.filter(curBlog => curBlog.id !== blog.id))
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {errorMessage ? <p>{errorMessage}</p> : null}
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </div>
    )
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification title={title} author={author} />
      <div style={{ display: 'flex', justifyContent: 'left' }}>
        <LoggedIn userName={user.name} />
        <LogOutButton handleLogOut={handleLogOut} />
      </div>
      <Togglable buttonLabel="New blogpost" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog => {
        return (<Blog 
          key={blog.id} 
          blog={blog} 
          updateBlog={() => updateBlog(blog)} 
          deleteBlog={() => deleteBlog(blog)}
          curUser={user}
          />
        )
      })}
    </div>
  )
}

export default App