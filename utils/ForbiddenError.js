const { HTTPError } = require('./HTTPError');
const { FORBIDDEN_HTTP_STATUS } = require('./consts');

class ForbiddenError extends HTTPError {
  constructor(message) {
    super(message, FORBIDDEN_HTTP_STATUS);
  }
}

module.exports = { ForbiddenError };
