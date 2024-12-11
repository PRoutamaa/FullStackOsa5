import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Yours truly',
    url: 'http://yourstruly.com',
    likes: 0
  }

  const mockHandler = vi.fn()

  const { container } = render(<Blog 
                            blog={blog}
                            updateBlog={() => {return}}
                            deleteBlog={() => {return}} 
                            />)  

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('renders all content', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Yours truly',
    url: 'http://yourstruly.com',
    likes: 0,
    user: { name: 'tester'}
  }
  render(<Blog 
          blog={blog}
          updateBlog={() => {return}}
          deleteBlog={() => {return}} 
          curUser={"tester"}
          />)  

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const allFields = screen.getByPlaceholderText('allVisible')
  expect(allFields).toHaveTextContent('Component testing is done with react-testing-library')
  expect(allFields).toHaveTextContent('Yours truly')
  expect(allFields).toHaveTextContent('http://yourstruly.com')
  expect(allFields).toHaveTextContent('likes')
  expect(allFields).toHaveTextContent('tester')
})

test('button is pressed twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Yours truly',
    url: 'http://yourstruly.com',
    likes: 0,
    user: { name: 'tester'}
  }

  const mockHandler = vi.fn()
  render(<Blog 
          blog={blog}
          updateBlog={mockHandler}
          deleteBlog={() => {return}} 
          curUser={"tester"}
          />)  

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)
  console.log(mockHandler.mock.calls)
  expect(mockHandler.mock.calls).toHaveLength(2)

})