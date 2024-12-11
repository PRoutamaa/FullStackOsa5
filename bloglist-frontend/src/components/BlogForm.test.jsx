import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('save')

  await user.type(inputs[0], 'testing the title field...')
  await user.type(inputs[1], 'testing the author field...')
  await user.type(inputs[2], 'testing the url field...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls[0][0])
  expect(createBlog.mock.calls[0][0].title).toBe('testing the title field...')
  expect(createBlog.mock.calls[0][0].author).toBe('testing the author field...')
  expect(createBlog.mock.calls[0][0].url).toBe('testing the url field...')

})