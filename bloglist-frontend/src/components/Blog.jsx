import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, curUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [visible, setVisible] = useState(false)

  if (!visible) {
    return (
      <>
        <div className='blog 'style={blogStyle}>
          {blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>view</button>
        </div>
      </>
    )
  }
  return (
    <>
      <div placeholder='allVisible' style={blogStyle}>
        <div>{blog.title} {blog.author} <button onClick={() => setVisible(!visible)}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={updateBlog}>like</button></div>
        <div>{blog.user.name}</div>
        {curUser.name === blog.user.name 
        ? <button onClick={deleteBlog}>delete</button>
        : null }
      </div>
    </>
  )
}

export default Blog