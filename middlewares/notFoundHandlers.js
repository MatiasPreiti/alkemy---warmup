const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
  const {
    output: { statusCode, payload },
  } = boom.notFound('your url was not found');
  res.status(statusCode).json(payload);
}

module.exports = { notFoundHandler };
