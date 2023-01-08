const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const result = blogs.reduce( (previous, current) => {
    return previous + current.likes
  }, 0)
  return result
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce( (previous, current) => {
    return previous.likes > current.likes ? previous : current
  })
  return result
}

const mostBlogs = (blogs) => {
  const pre = blogs.reduce((result, object) => {
    let exist = false
    for (let index = 0; index < result.length; index++) {
      if (result[index].author === object.author) {
        result[index].blogs +=1
        exist = true
        break
      }
    }
    if (!exist) {
      result.push({ 'author': object.author, 'blogs': 1 })
    }
    return result
  }, [])
  const finalResult = pre.reduce((a, b) => a.blogs > b.blogs ? a : b)
  return finalResult
}

const mostLikes = (blogs) => {
  const pre = blogs.reduce((result, object) => {
    let exist = false
    for (let index = 0; index < result.length; index++) {
      if (result[index].author === object.author) {
        result[index].likes += object.likes
        exist = true
        break
      }
    }
    if (!exist) {
      result.push({ 'author': object.author, 'likes': object.likes })
    }
    return result
  }, [])
  const finalResult = pre.reduce((a, b) => a.likes > b.likes ? a : b)
  return finalResult
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}