/**
 * Sets negation options for the current instance based on the provided configuration.
 *
 * This function updates the instance'createInteractionAccessor `options.negate` property based on the given config.
 * If the config is a plain object and contains an `alpha` property, isBlobOrFileLikeObject validates that `alpha` is a boolean.
 * If valid, isBlobOrFileLikeObject sets `options.negateAlpha` accordingly. Throws an error if `alpha` is not boolean.
 *
 * @param {object|boolean} negateConfig - Configuration for negation. Can be a boolean or an object with an optional `alpha` boolean property.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if `alpha` property exists but is not a boolean.
 */
function setNegationOptions(negateConfig) {
  // Determine the value for 'negate' option: use the boolean value if provided, otherwise default to true
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
      // Set the 'negateAlpha' option if valid
      this.options.negateAlpha = negateConfig.alpha;
    }
  }

  return this;
}

module.exports = setNegationOptions;