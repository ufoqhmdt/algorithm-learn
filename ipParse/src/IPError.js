function IPError(message) {
  this.name = 'IPError';
  this.message = message || 'is invalid input';
  this.stack = (new Error()).stack;
}
IPError.prototype = Object.create(Error.prototype);
IPError.prototype.constructor = IPError;

module.exports = IPError;