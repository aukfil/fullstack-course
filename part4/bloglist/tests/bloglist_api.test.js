const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const blog = response.body[0]
  assert.strictEqual(
    typeof blog.id !== 'undefined',
    true,
    'blog.id should be defined'
  )
})

test('a blog post can be succesfully added', async () => {
  const newBlog = {
    title: 'Blog C',
    author: 'Author C',
    url: 'blog.com/C',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('missing likes property defaults to zero', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Test author',
    url: 'test.com/no-likes'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0, 'likes should default to 0')
})

test('missing title property defaults to 400', async () => {
  const newBlog = {
    author: 'Test author',
    url: 'test.com/no-likes'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('missing url property defaults to 400', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Test author'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('deletion of a blog succeeds with status code 204 if id is valid', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const ids = blogsAtEnd.map(r => r.id)
  assert(!ids.includes(blogToDelete.id))
})

after(async () => {
  await mongoose.connection.close()
})