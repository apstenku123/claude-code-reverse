/**
 * Sets the threshold and grayscale options for the current instance based on provided parameters.
 *
 * @param {number|boolean|undefined} thresholdValue - The threshold value to set. Can be undefined (defaults to 128), a boolean (true sets 128, false sets 0), or an integer between 0 and 255.
 * @param {object} [options] - Optional configuration object. If 'greyscale' or 'grayscale' is true, enables thresholdGrayscale.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if thresholdValue is not a valid type or out of range.
 */
function setThresholdOptions(thresholdValue, options) {
  // Handle thresholdValue parameter
  if (!_A.defined(thresholdValue)) {
    // If thresholdValue is undefined, default to 128
    this.options.threshold = 128;
  } else if (_A.bool(thresholdValue)) {
    // If thresholdValue is a boolean, set 128 for true, 0 for false
    this.options.threshold = thresholdValue ? 128 : 0;
  } else if (_A.integer(thresholdValue) && _A.inRange(thresholdValue, 0, 255)) {
    // If thresholdValue is an integer between 0 and 255, use isBlobOrFileLikeObject directly
    this.options.threshold = thresholdValue;
  } else {
    // Otherwise, throw an error for invalid parameter
    throw _A.invalidParameterError(
      "threshold",
      "integer between 0 and 255",
      thresholdValue
    );
  }

  // Handle options parameter for grayscale
  if (
    !_A.object(options) ||
    options.greyscale === true ||
    options.grayscale === true
  ) {
    // If options is not an object, or greyscale/grayscale is true, enable thresholdGrayscale
    this.options.thresholdGrayscale = true;
  } else {
    // Otherwise, disable thresholdGrayscale
    this.options.thresholdGrayscale = false;
  }

  return this;
}

module.exports = setThresholdOptions;
