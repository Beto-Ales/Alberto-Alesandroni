const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
// const User = require('../models/user')
// // const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//         return authorization.substring(7)
//     }
//     return null
// }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {

    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    // console.log('request.token', request.token)
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!request.token) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }

    const user = request.user

    // if (!user) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }

    // const user = await User.findById(decodedToken.id)
    
    // console.log('request.user', request.user)
    
    const body = request.body
    
    if (!body.title || !body.url) {
        return response.status(400).end()
    }

    const likes = body.likes ? true : false

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: likes ? body.likes : 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
    console.log('first line')
    // if (!request.token) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }
    
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // const user = await User.findById(decodedToken.id)
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    // if (!user) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }

    if (!blog) {
        return response.status(404).json({ error: 'resource not found' })
    }
    
    if (!(blog.user.toString() === user.id)) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

    // if (blog.user.toString() === user.id) {
    //     await Blog.findByIdAndRemove(request.params.id)
    //     response.status(204).end()
    // }
})

blogsRouter.put('/:id', async (request, response) => {
    const {title, author, url, likes} = request.body

    const blogPostUpdate = {
        title,
        author,
        url,
        likes
    }
    
    const updatedPost = await Blog.findByIdAndUpdate(request.params.id, blogPostUpdate, {new: true})
    response.status(200).json(updatedPost)
})

module.exports = blogsRouter