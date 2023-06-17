const { HTTPError } = require('./HTTPError');
const { NOT_FOUND_HTTP_STATUS } = require('./consts');

class NotFoundError extends HTTPError {
  constructor(message) {
    super(message, NOT_FOUND_HTTP_STATUS);
  }
}

module.exports = { NotFoundError };
