import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoggedIn from './components/LoggedIn'
import blogService from './services/blogs'
import loginService from './services/login'
import LogOutButton from './components/LogOutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
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

  const handleBlogChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setNewBlog((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const addBlog = (event) => {
    event.preventDefault()
    blogService.createNewBlog(newBlog)
    setBlogs(blogs.concat(newBlog))
    setTitle(newBlog.title)
    setAuthor(newBlog.author)
    setNewBlog({ title: "", author: "", url: "" })
    setTimeout(() => {
      setAuthor("")
      setTitle("")
    }, 5000)
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
      <BlogForm addBlog={addBlog} newBlog={newBlog} handleBlogChange={handleBlogChange} />
      {blogs.sort((a, b) => a.title.localeCompare(b.title)).map(blog => {
        return <Blog key={blog.id} blog={blog} />
      })}
    </div>
  )
}

export default App