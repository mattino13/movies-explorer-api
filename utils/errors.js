const { ValidationError, CastError } = require('mongoose').Error;

const { HTTPError } = require('./HTTPError');
const { ForbiddenError } = require('./ForbiddenError');
const { NotFoundError } = require('./NotFoundError');
const { NotImplementedError } = require('./NotImplementedError');
const { UnauthorizedError } = require('./UnauthorizedError');

const {
  BAD_REQUEST_HTTP_STATUS,
  CONFLICT_HTTP_STATUS,
  COMMON_SERVER_ERROR_STATUS,
} = require('./consts');

function handleServerError(err, res) {
  if (err instanceof HTTPError) {
    res.status(err.statusCode).send({ message: err.message });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(BAD_REQUEST_HTTP_STATUS).send({ message: `Произошла ошибка ${err}` });
    return;
  }

  if (err instanceof CastError) {
    res.status(BAD_REQUEST_HTTP_STATUS).send({ message: `Произошла ошибка ${err}` });
    return;
  }

  // MongoDB duplicate key
  if (err.code === 11000) {
    res.status(CONFLICT_HTTP_STATUS).send({ message: 'Такая запись уже существует' });
    return;
  }

  res.status(COMMON_SERVER_ERROR_STATUS).send({ message: 'Внутренняя ошибка сервера' });
}

module.exports = {
  handleServerError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  NotImplementedError,
};
