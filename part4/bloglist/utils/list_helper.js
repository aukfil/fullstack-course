const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    return blogs.reduce((favourite, current) => {
        return current.likes > favourite.likes ? current : favourite
    }, blogs[0]) 
}

const mostBlogs = (blogs) => {
    
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }