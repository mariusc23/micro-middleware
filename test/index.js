const { expect } = require('chai')
const sinon = require('sinon')
const { applyMiddleware } = require('../')

describe('applyMiddleware', () => {
  it('should call handler and every middleware', async () => {
    const spies = [
      sinon.spy(),
      sinon.spy(),
      sinon.spy(),
    ]

    const middleware = [
      next => async (req, res) => {
        spies[0]()
        return await next(req, res)
      },
      next => async (req, res) => {
        spies[1]()
        return await next(req, res)
      },
    ]

    const handler = async () => {
      spies[2]()
    }

    applyMiddleware(middleware, handler)()

    expect(spies[0].calledOnce).to.equal(true)
    expect(spies[1].calledOnce).to.equal(true)
    expect(spies[2].calledOnce).to.equal(true)
  })

  it('should return handler value', async () => {
    const middleware = [
      next => () => next(),
    ]
    const handler = async () => true
    const result = await applyMiddleware(middleware, handler)()
    expect(result).to.equal(true)
  })

  it('should work with synchronous middleware and handler', () => {
    const middleware = [
      next => () => next(),
    ]
    const handler = () => true
    const result = applyMiddleware(middleware, handler)()
    expect(result).to.equal(true)
  })

  it('should work with synchronous middleware and async handler', async () => {
    const middleware = [
      next => () => next(),
    ]
    const handler = async () => true
    const result = await applyMiddleware(middleware, handler)()
    expect(result).to.equal(true)
  })

  it('should work with no middleware', () => {
    const middleware = []
    const handler = () => true
    const result = applyMiddleware(middleware, handler)()
    expect(result).to.equal(true)
  })
})
