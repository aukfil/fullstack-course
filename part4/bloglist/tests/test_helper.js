const notesRouter = require('../../../notes-backend/controllers/notes')
const note = require('../../../notes-backend/models/note')
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Blog A',
      author: 'Author A',
      url: 'blog.com/A',
      likes: 3
    },
    {
      title: 'Blog B',
      author: 'Author B',
      url: 'blog.com/B',
      likes: 5
    }
  ]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, blogsInDb, usersInDb }