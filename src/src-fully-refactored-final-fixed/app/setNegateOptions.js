/**
 * Sets the 'negate' and optional 'negateAlpha' options based on the provided configuration.
 *
 * If the input is a boolean, sets 'negate' to that value. If the input is an object with an 'alpha' property,
 * validates that 'alpha' is a boolean and sets 'negateAlpha' accordingly. Throws an error if 'alpha' is not boolean.
 *
 * @param {boolean|Object} negateConfig - Boolean to set 'negate', or object with optional 'alpha' boolean property.
 * @returns {this} Returns the current instance for chaining.
 */
function setNegateOptions(negateConfig) {
  // Determine the value for 'negate' option
  this.options.negate = _A.bool(negateConfig) ? negateConfig : true;

  // If the config is a plain object and has an 'alpha' property
  if (_A.plainObject(negateConfig) && "alpha" in negateConfig) {
    // Validate that 'alpha' is a boolean
    if (!_A.bool(negateConfig.alpha)) {
      throw _A.invalidParameterError(
        "alpha",
        "should be boolean value",
        negateConfig.alpha
      );
    } else {
      // Set the 'negateAlpha' option
      this.options.negateAlpha = negateConfig.alpha;
    }
  }

  return this;
}

module.exports = setNegateOptions;