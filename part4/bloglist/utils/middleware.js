const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

const tokenExtractor = (request, response, next) => {
    // console.log('getTokenFrom(request)', getTokenFrom(request))
    if (!getTokenFrom(request)) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.token = getTokenFrom(request)
    logger.info('token', request.token)
    next()
}

const decodedToken = request => {
    return jwt.verify(request.token, process.env.SECRET)
}

const userExtractor = async (request, response, next) => {
    // console.log('decodedToken(request).id', decodedToken(request).id)
    if (!decodedToken(request).id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    request.user = await User.findById(decodedToken(request).id)
    logger.info('user', request.user.toString())
    next()
}

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

module.exports = {
    tokenExtractor,
    userExtractor,
    requestLogger,
    unknownEndpoint,
    errorHandler
}