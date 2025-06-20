/**
 * Sets the background color option 'tint' to the specified value.
 *
 * @param {string} tintValue - The value to set for the background tint option.
 * @returns {this} Returns the current instance for method chaining.
 */
function setBackgroundTintOption(tintValue) {
  // Set the 'tint' background color option to the provided value
  this._setBackgroundColourOption("tint", tintValue);
  // Return the current instance to allow method chaining
  return this;
}

module.exports = setBackgroundTintOption;