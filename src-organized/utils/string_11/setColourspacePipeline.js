/**
 * Sets the colourspace pipeline option after validating the input.
 *
 * @param {string} colourspaceName - The name of the colourspace pipeline to set. Must be a string.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws an error if the provided colourspaceName is not a string.
 */
function setColourspacePipeline(colourspaceName) {
  // Validate that the input is a string using the W$ utility
  if (!W$.string(colourspaceName)) {
    throw W$.invalidParameterError("colourspace", "string", colourspaceName);
  }

  // Set the colourspacePipeline option and return this for chaining
  this.options.colourspacePipeline = colourspaceName;
  return this;
}

module.exports = setColourspacePipeline;