/**
 * Sets the background color option 'tint' to the specified value.
 *
 * @param {string} tintColor - The color value to set for the 'tint' background option.
 * @returns {this} Returns the current instance for method chaining.
 */
function setTintBackgroundColorOption(tintColor) {
  // Set the 'tint' background color option using the provided color value
  this._setBackgroundColourOption("tint", tintColor);
  // Return the current instance to allow method chaining
  return this;
}

module.exports = setTintBackgroundColorOption;