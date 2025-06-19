/**
 * Sets the 'greyscale' option on the current instance based on the provided value.
 * If the provided value is not a boolean, defaults to true.
 *
 * @param {any} greyscaleValue - The value to set for the greyscale option. If not a boolean, greyscale will be enabled (true).
 * @returns {this} Returns the current instance for chaining.
 */
function setGreyscaleOption(greyscaleValue) {
  // Use W$.bool to check if the provided value is a boolean
  // If not, default to true
  this.options.greyscale = W$.bool(greyscaleValue) ? greyscaleValue : true;
  return this;
}

module.exports = setGreyscaleOption;