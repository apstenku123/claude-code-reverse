/**
 * Sets the 'colourspace' option for the current instance after validating the input.
 *
 * @param {string} colourspace - The colourspace value to set. Must be a string.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws an error if the provided colourspace is not a string.
 */
function setColourspaceOption(colourspace) {
  // Validate that the input is a string using the W$ utility
  if (!W$.string(colourspace)) {
    throw W$.invalidParameterError("colourspace", "string", colourspace);
  }
  // Set the colourspace option and return the current instance for chaining
  this.options.colourspace = colourspace;
  return this;
}

module.exports = setColourspaceOption;