# micro-middleware

> Middleware for [micro](https://github.com/zeit/micro)

[![CircleCI](https://circleci.com/gh/mariusc23/micro-middleware.svg?style=shield)](https://circleci.com/gh/mariusc23/micro-middleware)

## Installation

    npm install --save @mariusc23/micro-middleware


## Usage

```js
const { createError, send } = require('micro')
const { applyMiddleware } = require('micro-middleware')

const handleErrors = next => async (req, res) => {
  try {
    return await next(req, res)
  } catch (err) {
    const code = err.statusCode || 500
    const message = err.message || 'Unknown Error'
    send(res, code, { error: { code, message }})
  }
}

const allowMethods = methods => next => async (req, res) => {
  if (methods.indexOf(req.method) === -1) {
    throw createError(405, 'Method Not Allowed')
  }
  return await next(req, res)
}

const middleware = [
  handleErrors,
  allowMethods(['GET'])
]

module.exports = applyMiddleware(middleware, async (req, res) => {
  return 'Hello world!'
})
```

**Note:** Your error handler should be first. It is not treated differently, but you probably want it to catch any errors in your middleware.

## Defining Middleware

A micro middleware is a function that gets passed in the next middleware (or final handler) and returns another function that gets passed in the request and response object.

If the middleware wants to respond, it can return an object or promise. If not, it invokes the next middleware (or final handler).

```js
const middlewareExample = nextMiddlewareOrHandler => (req, res) => {
  if (someCondition) {
    return 'This middleware will respond instead of the handler'
  }
  return next(req, res)
}
```

## License

[MIT](./LICENSE.md)
