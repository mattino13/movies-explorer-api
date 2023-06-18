const { HTTPError } = require('./HTTPError');
const { UNAUTHORIZED_HTTP_STATUS } = require('./consts');

class UnauthorizedError extends HTTPError {
  constructor(message) {
    super(message, UNAUTHORIZED_HTTP_STATUS);
  }
}

module.exports = { UnauthorizedError };
