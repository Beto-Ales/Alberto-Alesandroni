const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
}, 100000)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('blog id is defined', async () => {
    const blogs = await Blog.find({})
    const oneBlog = blogs[0]
    expect(oneBlog.id).toBeDefined()
}, 100000)

describe('creation of a blog', () => {

    const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzYjg3NjY3ZjA4NzM2MGY0MjIyYTgyOCIsImlhdCI6MTY3MzEwMTE2OH0.chtXJqbR3CwPCznFRb4xG4QrrZoO9yDaMwZGsFHR-eI'
    
    test('with valid data can be created', async () => {
        const newBlog = {
            title: 'test token create post title',
            author: 'test token create post author',
            url: 'test token create post url'
        }

        // const userForToken = {
        //     username: 'root',
        //     id: '63a0bc1d655b48392b0a83d6',
        // }

        // const token = jwt.sign(userForToken, process.env.SECRET)
        // console.log('token', token)
        // const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYzYjg3NjY3ZjA4NzM2MGY0MjIyYTgyOCIsImlhdCI6MTY3MzEwMTE2OH0.chtXJqbR3CwPCznFRb4xG4QrrZoO9yDaMwZGsFHR-eI'
        await api
            .post('/api/blogs')
            .set({ Authorization: token })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)

        expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
        expect(titles).toContain(
            'test token create post title'  //    'test create post title'
        )
    }, 100000)

    test('likes default value is zero', async () => {
        const newBlog = {
            title: 'test likes title',
            author: 'test likes author',
            url: 'test likes url'
        }
        await api
            .post('/api/blogs')
            .set({ Authorization: token })
            .send(newBlog)
            .expect(201)
        const result = await Blog.find({})
        const blogs = result.map(blog => blog.toJSON())
        const lastBlog = blogs[helper.initialBlogs.length]
        expect(lastBlog.likes).toBe(0)
    })

    test('if title and url missing, status is 400 bad request', async () => {
        const newBlog = {
            author: 'test author'
        }
        await api
            .post('/api/blogs')
            .set({ Authorization: token })
            .send(newBlog)
            .expect(400)
    })

})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const urls = blogsAtEnd.map(blog => blog.url)

        expect(urls).not.toContain(blogToDelete.url)
    })
})

test('a blog post can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const blogToUpdateLikes = blogsAtStart[0].likes
    
    const newBlog = {
        title: 'test update title',
        author: 'test update author',
        url: 'test update url',
        likes: blogToUpdateLikes + 1
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes + 1)

    expect(blogsAtEnd[0].title).toBe('test update title')
}, 100000)

afterAll(() => {
    mongoose.connection.close()
})

// the test with that name or part of the name
// npm test -- -t 'if title'

// a specific file to test
// npm test -- tests/blog_api.test.js

// run all tests
// npm test