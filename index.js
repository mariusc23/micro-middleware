const bindMiddleware = (middlewares, i, handler) => {
  let middleware = middlewares[i]
  if (middlewares.length > i + 1) { // has next middleware
    return middleware(bindMiddleware(middlewares, i + 1, handler))
  }
  return middleware(handler)
}

const applyMiddleware = (middlewares, handler) => (req, res) => {
  const chain = middlewares.map((middleware, i) => {
    return bindMiddleware(middlewares, i, handler)
  })
  const fn = chain[0] || handler
  return fn(req, res)
}

module.exports = {
  applyMiddleware,
}
