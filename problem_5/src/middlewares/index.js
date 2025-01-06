const transform = require('lodash/transform');
const camelCase = require('lodash/camelCase');
const isPlainObject = require('lodash/isPlainObject');

const toCamelCase = (obj) => {
  if (!isPlainObject(obj)) return obj;

  return transform(obj, (result, value, key) => {
    const camelKey = camelCase(key);
    result[camelKey] = isPlainObject(value) ? toCamelCase(value) : value;
  });
}

const camelCaseMiddleware = (req, res, next) => {
  if (req.body && isPlainObject(req.body)) {
    req.body = toCamelCase(req.body);
  }
  if (req.query && isPlainObject(req.query)) {
    req.query = toCamelCase(req.query);
  }
  if (req.params && isPlainObject(req.params)) {
    req.params = toCamelCase(req.params);
  }
  next();
}

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
      return res.status(err.statusCode).json({
        errorMessage: err.message,
      });
    }
  
    console.error("Unhandled error:", err);
  
    return res.status(500).json({
        errorMessage: "Internal Server Error",
    });
}


module.exports = {
  camelCaseMiddleware,
  errorHandler
}