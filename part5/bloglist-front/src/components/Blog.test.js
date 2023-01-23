import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testing front author',
    user: 'test front user',
    likes: 'test front likes',
    url: 'test front url',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.test-click-details')
  const divDetails = container.querySelector('.div-details')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(div).toHaveTextContent(
    'testing front author'
  )

  expect(divDetails).toHaveStyle('display: none')

  screen.debug()

//   const element = screen.getAllByText('Component testing is done with react-testing-library')
//   expect(element).toBeDefined()
})

test('shown details after clicking the button', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'testing front author',
    user: 'test front user',
    likes: 'test front likes',
    url: 'test front url',
  }

  const { container } = render(<Blog blog={blog} />)

  const divDetails = container.querySelector('.div-details')

  expect(divDetails).toHaveStyle('display: none')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(divDetails).not.toHaveStyle('display: none')
  // expect(div).toHaveTextContent('test front url')

  // screen.debug()
})

test('like button is clicked twice, then event handler is called twice', async () => {
  const blog = {
    title: 'clean code',
    author: 'robert c martin',
    url: 'someurl.com.ar',
    likes: '11',
    user: { id: '621153e48504f231882cb81b' }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('Like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> calls the event handler with the right details', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={ createBlog } />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')

  const createBtn = screen.getByText('create')

  await user.type(titleInput, 'testing title')
  await user.type(authorInput, 'testing author')
  await user.type(urlInput, 'testing url')
  await user.click(createBtn)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing url')
})


// https://fullstackopen.com/en/part5/end_to_end_testing#exercises-5-17-5-22