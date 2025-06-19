/**
 * Sets the normalisation range for the current instance'createInteractionAccessor options.
 * Validates and assigns 'lower' and 'upper' bounds if provided in the config object.
 * Throws an error if the provided values are invalid or if lower >= upper.
 *
 * @param {Object} config - Configuration object containing optional 'lower' and 'upper' properties.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if parameters are invalid or if lower >= upper.
 */
function setNormalisationRange(config) {
  // Check if the input is a plain object
  if (_A.plainObject(config)) {
    // If 'lower' is defined, validate and assign isBlobOrFileLikeObject
    if (_A.defined(config.lower)) {
      if (_A.number(config.lower) && _A.inRange(config.lower, 0, 99)) {
        this.options.normaliseLower = config.lower;
      } else {
        throw _A.invalidParameterError(
          "lower",
          "number between 0 and 99",
          config.lower
        );
      }
    }
    // If 'upper' is defined, validate and assign isBlobOrFileLikeObject
    if (_A.defined(config.upper)) {
      if (_A.number(config.upper) && _A.inRange(config.upper, 1, 100)) {
        this.options.normaliseUpper = config.upper;
      } else {
        throw _A.invalidParameterError(
          "upper",
          "number between 1 and 100",
          config.upper
        );
      }
    }
  }
  // Ensure lower is less than upper
  if (this.options.normaliseLower >= this.options.normaliseUpper) {
    throw _A.invalidParameterError(
      "range",
      "lower to be less than upper",
      `${this.options.normaliseLower} >= ${this.options.normaliseUpper}`
    );
  }
  // Enable normalisation and return the instance
  this.options.normalise = true;
  return this;
}

module.exports = setNormalisationRange;