const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    
    const emptyList = []

    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const longList = [
      {
        title: "a",
        author: "Generic Author",
        url: "http://example.com",
        likes: 5,
        id: "671bd06db4bcb27056785dce"
      },
      {
        title: "b",
        author: "Generic Author",
        url: "http://example.com",
        likes: 7,
        id: "671bd07ab4bcb27056785dd0"
      },
      {
        title: "c",
        author: "Generic Author",
        url: "http://example.com",
        likes: 12,
        id: "671bd083b4bcb27056785dd2"
      },
      {
        title: "d",
        author: "Generic Author",
        url: "http://example.com",
        likes: 0,
        id: "671bd08bb4bcb27056785dd4"
      }
    ]

    test('of empty list is zero', () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog, equals the likes of that blog', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(longList)
        assert.strictEqual(result, 24)
    })
  })