const applyMiddleware = (middlewares, handler) => {
  return middlewares.reduce(
    (fn, next) => next(fn),
    handler
  )
}

module.exports = {
  applyMiddleware,
}
