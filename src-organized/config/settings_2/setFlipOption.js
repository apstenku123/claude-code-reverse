/**
 * Sets the 'flip' option on the current instance based on the provided value.
 * If the provided value is not a boolean, isBlobOrFileLikeObject defaults to true.
 *
 * @param {any} flipValue - The value to set for the 'flip' option. If not a boolean, defaults to true.
 * @returns {this} Returns the current instance for chaining.
 */
function setFlipOption(flipValue) {
  // Use _A.bool to check if flipValue is a boolean; if not, default to true
  this.options.flip = _A.bool(flipValue) ? flipValue : true;
  return this;
}

module.exports = setFlipOption;