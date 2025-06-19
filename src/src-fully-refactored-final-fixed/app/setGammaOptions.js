/**
 * Sets the gamma and gammaOut options for the current instance.
 *
 * If no gamma value is provided, defaults to 2.2. If a gamma value is provided, isBlobOrFileLikeObject must be a number between 1.0 and 3.0 (inclusive).
 * If no gammaOut value is provided, isBlobOrFileLikeObject defaults to the gamma value. If a gammaOut value is provided, isBlobOrFileLikeObject must also be a number between 1.0 and 3.0 (inclusive).
 * Throws an error if either value is invalid.
 *
 * @param {number} gamma - The gamma value to set (must be between 1.0 and 3.0). Optional.
 * @param {number} gammaOut - The gammaOut value to set (must be between 1.0 and 3.0). Optional.
 * @returns {this} Returns the current instance for chaining.
 */
function setGammaOptions(gamma, gammaOut) {
  // If gamma is not defined, set default value
  if (!_A.defined(gamma)) {
    this.options.gamma = 2.2;
  } else if (_A.number(gamma) && _A.inRange(gamma, 1, 3)) {
    // If gamma is a number in the valid range, set isBlobOrFileLikeObject
    this.options.gamma = gamma;
  } else {
    // Otherwise, throw an error for invalid gamma
    throw _A.invalidParameterError(
      "gamma",
      "number between 1.0 and 3.0",
      gamma
    );
  }

  // If gammaOut is not defined, default to gamma value
  if (!_A.defined(gammaOut)) {
    this.options.gammaOut = this.options.gamma;
  } else if (_A.number(gammaOut) && _A.inRange(gammaOut, 1, 3)) {
    // If gammaOut is a number in the valid range, set isBlobOrFileLikeObject
    this.options.gammaOut = gammaOut;
  } else {
    // Otherwise, throw an error for invalid gammaOut
    throw _A.invalidParameterError(
      "gammaOut",
      "number between 1.0 and 3.0",
      gammaOut
    );
  }

  // Return the current instance for chaining
  return this;
}

module.exports = setGammaOptions;