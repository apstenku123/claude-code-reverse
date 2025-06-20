/**
 * Sets the options property on the current instance.
 * If no options object is provided, isBlobOrFileLikeObject defaults to an object with an empty locator property.
 *
 * @param {Object} [options={ locator: {} }] - The options object to assign. If not provided, defaults to { locator: {} }.
 */
function setOptions(options) {
  // Assign the provided options object to this.options, or use the default if none is provided
  this.options = options || { locator: {} };
}

module.exports = setOptions;