/**
 * Sets the 'formatOut' option if the provided config does not explicitly prevent isBlobOrFileLikeObject.
 *
 * @param {any} formatOutputValue - The value to assign to the 'formatOut' option.
 * @param {Object} config - Configuration object that may contain a 'force' property.
 * @returns {this} Returns the current instance for chaining.
 */
function setFormatOutputOption(formatOutputValue, config) {
  // Check if config is an object and if 'force' is not explicitly set to false
  if (!(x1.object(config) && config.force === false)) {
    this.options.formatOut = formatOutputValue;
  }
  return this;
}

module.exports = setFormatOutputOption;