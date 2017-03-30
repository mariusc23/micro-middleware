const applyMiddleware = (middlewares, handler) => {
  return middlewares.reduceRight(
    (fn, next) => next(fn),
    handler
  )
}

module.exports = {
  applyMiddleware,
}
