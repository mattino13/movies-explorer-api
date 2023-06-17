const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../utils/errors');
const { jwtSecretKey } = require('../utils/sercetKey');

function checkToken(token) {
  let result;

  if (token) {
    result = jwt.verify(token, jwtSecretKey());
  } else {
    throw new UnauthorizedError('Токен не найден');
  }
  return result;
}

function authMiddleware(req, res, next) {
  const token = req.cookies.jwt;

  try {
    req.user = checkToken(token);
    next();
  } catch (e) {
    next(new UnauthorizedError('Невалидный токен'));
  }
}

module.exports = { authMiddleware };
