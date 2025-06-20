/**
 * Sets a boolean option in the options object.
 * Throws an error if the provided value is not a boolean.
 *
 * @param {string} optionName - The name of the option to set.
 * @param {boolean} optionValue - The boolean value to assign to the option.
 * @throws {Error} Throws an error if optionValue is not a boolean.
 */
function setBooleanOption(optionName, optionValue) {
  // Validate that optionValue is a boolean using x1.bool
  if (x1.bool(optionValue)) {
    // Set the option if validation passes
    this.options[optionName] = optionValue;
  } else {
    // Throw an error if the value is not a boolean
    throw x1.invalidParameterError(optionName, "boolean", optionValue);
  }
}

module.exports = setBooleanOption;