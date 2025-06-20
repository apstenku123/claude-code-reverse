/**
 * Sets the 'medianSize' option for this instance based on the provided size parameter.
 *
 * If the size is undefined, sets the default medianSize to 3.
 * If the size is an integer between 1 and 1000 (inclusive), sets medianSize to the provided value.
 * Otherwise, throws an error indicating an invalid parameter.
 *
 * @param {number|undefined} size - The desired median size. Must be an integer between 1 and 1000, or undefined for default.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if the size parameter is invalid.
 */
function setMedianSizeOption(size) {
  // If size is undefined, set to default value 3
  if (!_A.defined(size)) {
    this.options.medianSize = 3;
  } 
  // If size is a valid integer in the allowed range, set to that value
  else if (_A.integer(size) && _A.inRange(size, 1, 1000)) {
    this.options.medianSize = size;
  } 
  // Otherwise, throw an error for invalid parameter
  else {
    throw _A.invalidParameterError(
      "size",
      "integer between 1 and 1000",
      size
    );
  }
  return this;
}

module.exports = setMedianSizeOption;