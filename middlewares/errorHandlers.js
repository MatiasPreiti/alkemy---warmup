const boom = require('@hapi/boom');
const { config } = require('../config/config.json');

function withErrorStack(error, stack) {
  if (config.development) {
    return { ...error, stack };
  }
  return error;
}

function logErrors(err, req, res, next) {
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function errorHandler(err, req, res) {
  const {
    output: { statusCode, payload },
  } = err;

  res.status(statusCode || 500);
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
};
