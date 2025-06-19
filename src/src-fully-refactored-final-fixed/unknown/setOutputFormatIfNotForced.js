/**
 * Sets the output format option unless the configuration explicitly forces otherwise.
 *
 * @param {any} outputFormat - The format to set as the output format.
 * @param {Object} config - Configuration object that may contain a 'force' property.
 * @returns {this} Returns the current instance for chaining.
 */
function setOutputFormatIfNotForced(outputFormat, config) {
  // Check if config is an object and if 'force' is not explicitly set to true
  if (!(x1.object(config) && config.force === false)) {
    // Set the output format option
    this.options.formatOut = outputFormat;
  }
  // Return the current instance for chaining
  return this;
}

module.exports = setOutputFormatIfNotForced;