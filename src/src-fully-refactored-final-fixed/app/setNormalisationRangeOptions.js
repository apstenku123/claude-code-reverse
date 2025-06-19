/**
 * Sets the normalisation range options for this instance based on the provided configuration object.
 * Validates that the lower and upper bounds are numbers within the allowed ranges and that lower < upper.
 * Throws an error if validation fails.
 *
 * @param {Object} normalisationConfig - Configuration object for normalisation range.
 * @param {number} [normalisationConfig.lower] - Lower bound for normalisation (optional, must be between 0 and 99).
 * @param {number} [normalisationConfig.upper] - Upper bound for normalisation (optional, must be between 1 and 100).
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if parameters are invalid or lower >= upper.
 */
function setNormalisationRangeOptions(normalisationConfig) {
  // Check if the input is a plain object
  if (_A.plainObject(normalisationConfig)) {
    // If 'lower' is defined, validate and assign
    if (_A.defined(normalisationConfig.lower)) {
      if (_A.number(normalisationConfig.lower) && _A.inRange(normalisationConfig.lower, 0, 99)) {
        this.options.normaliseLower = normalisationConfig.lower;
      } else {
        throw _A.invalidParameterError(
          "lower",
          "number between 0 and 99",
          normalisationConfig.lower
        );
      }
    }
    // If 'upper' is defined, validate and assign
    if (_A.defined(normalisationConfig.upper)) {
      if (_A.number(normalisationConfig.upper) && _A.inRange(normalisationConfig.upper, 1, 100)) {
        this.options.normaliseUpper = normalisationConfig.upper;
      } else {
        throw _A.invalidParameterError(
          "upper",
          "number between 1 and 100",
          normalisationConfig.upper
        );
      }
    }
  }

  // Ensure lower bound is less than upper bound
  if (this.options.normaliseLower >= this.options.normaliseUpper) {
    throw _A.invalidParameterError(
      "range",
      "lower to be less than upper",
      `${this.options.normaliseLower} >= ${this.options.normaliseUpper}`
    );
  }

  // Enable normalisation
  this.options.normalise = true;
  return this;
}

module.exports = setNormalisationRangeOptions;