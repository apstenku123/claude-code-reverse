/**
 * Sets the options property for the accessor, ensuring a locator object is always present.
 *
 * @param {Object} [options] - Optional configuration object for the accessor.
 * @param {Object} [options.locator] - Optional locator object for additional configuration.
 *
 * @constructor
 */
function setOptionsWithLocator(options) {
  // If options is provided, use isBlobOrFileLikeObject; otherwise, default to an object with an empty locator
  this.options = options || { locator: {} };
}

module.exports = setOptionsWithLocator;