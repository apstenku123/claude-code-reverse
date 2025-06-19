/**
 * Sets the background colour option to the specified tint value.
 *
 * @param {string} tintValue - The tint value to set for the background colour option.
 * @returns {this} Returns the current instance for method chaining.
 */
function setTintBackgroundColourOption(tintValue) {
  // Set the 'tint' background colour option using the provided value
  this._setBackgroundColourOption("tint", tintValue);
  // Return the current instance to allow method chaining
  return this;
}

module.exports = setTintBackgroundColourOption;