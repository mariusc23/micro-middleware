const applyMiddleware = (middlewares, handler) => (
  middlewares.reduceRight(
    (fn, next) => next(fn),
    handler
  )
)

module.exports = {
  applyMiddleware,
}
