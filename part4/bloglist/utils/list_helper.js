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
  if (blogs.length === 0) return null

  const authorCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const topAuthor = Object.entries(authorCounts).reduce((max, [author, count]) => {
    return count > max.blogs ? {author, blogs: count} : max
  }, {author: '', blogs: 0})

  return topAuthor
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
  }