import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)

    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleBlogChange = (event) => {
    event.preventDefault()
    const { name, value } = event.target
    setNewBlog((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  return (
    <form className='form' onSubmit={addBlog}>
      <h2>Create new blogpost</h2>
      <div>
      title:
        <input
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleBlogChange}
        />
      </div>
      <div>
      author:
        <input
          type='text'
          name="author"
          value={newBlog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
      url:
        <input
          type='text'
          name="url"
          value={newBlog.url}
          onChange={handleBlogChange}
        />
      </div>
      <button type="create">save</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm