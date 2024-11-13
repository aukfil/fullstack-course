const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  console.log(response.body)
  const blog = response.body[0]
  assert.strictEqual(
    typeof blog.id !== 'undefined',
    true,
    'blog.id should be defined'
  )
})

after(async () => {
  await mongoose.connection.close()
})