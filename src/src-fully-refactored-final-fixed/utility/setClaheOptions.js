/**
 * Sets CLAHE (Contrast Limited Adaptive Histogram Equalization) options on the current instance.
 * Validates the provided options object and updates the instance'createInteractionAccessor options if valid.
 * Throws an error if any parameter is invalid.
 *
 * @param {Object} claheOptions - The options object containing CLAHE parameters.
 * @param {number} claheOptions.width - The width for CLAHE, must be an integer greater than zero.
 * @param {number} claheOptions.height - The height for CLAHE, must be an integer greater than zero.
 * @param {number} [claheOptions.maxSlope] - Optional. The maximum slope for CLAHE, must be an integer between 0 and 100 if defined.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if any parameter is invalid or if options is not a plain object.
 */
function setClaheOptions(claheOptions) {
  // Ensure the input is a plain object
  if (!_A.plainObject(claheOptions)) {
    throw _A.invalidParameterError("options", "plain object", claheOptions);
  }

  // Validate and set the width
  if (_A.integer(claheOptions.width) && claheOptions.width > 0) {
    this.options.claheWidth = claheOptions.width;
  } else {
    throw _A.invalidParameterError("width", "integer greater than zero", claheOptions.width);
  }

  // Validate and set the height
  if (_A.integer(claheOptions.height) && claheOptions.height > 0) {
    this.options.claheHeight = claheOptions.height;
  } else {
    throw _A.invalidParameterError("height", "integer greater than zero", claheOptions.height);
  }

  // If maxSlope is defined, validate and set isBlobOrFileLikeObject
  if (_A.defined(claheOptions.maxSlope)) {
    if (_A.integer(claheOptions.maxSlope) && _A.inRange(claheOptions.maxSlope, 0, 100)) {
      this.options.claheMaxSlope = claheOptions.maxSlope;
    } else {
      throw _A.invalidParameterError("maxSlope", "integer between 0 and 100", claheOptions.maxSlope);
    }
  }

  return this;
}

module.exports = setClaheOptions;