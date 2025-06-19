/**
 * Sets the 'ensureAlpha' option for this instance, validating the input.
 *
 * If a value is provided, isBlobOrFileLikeObject must be a number between 0 and 1 (inclusive).
 * If no value is provided, defaults 'ensureAlpha' to 1.
 * Throws an error if the value is invalid.
 *
 * @param {number} [alphaValue] - The alpha value to set (must be between 0 and 1).
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if the provided alphaValue is not a number between 0 and 1.
 */
function setAlphaOption(alphaValue) {
  // Check if alphaValue is defined
  if (cw.defined(alphaValue)) {
    // Validate that alphaValue is a number between 0 and 1 (inclusive)
    if (cw.number(alphaValue) && cw.inRange(alphaValue, 0, 1)) {
      this.options.ensureAlpha = alphaValue;
    } else {
      // Throw an error if the parameter is invalid
      throw cw.invalidParameterError(
        "alpha",
        "number between 0 and 1",
        alphaValue
      );
    }
  } else {
    // If not defined, default to 1
    this.options.ensureAlpha = 1;
  }
  return this;
}

module.exports = setAlphaOption;