const BlogForm = ({ addBlog, newBlog, handleBlogChange }) => {
    return (
    <form onSubmit={addBlog}>
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

export default BlogForm