/**
 * Sets the 'flatten' option and optionally updates the background color option.
 *
 * If the provided option is a boolean, isBlobOrFileLikeObject sets the 'flatten' option to that value.
 * If not, isBlobOrFileLikeObject defaults 'flatten' to true. If the provided option is an object,
 * isBlobOrFileLikeObject also sets the 'flattenBackground' option using the object'createInteractionAccessor 'background' property.
 *
 * @param {boolean|object} flattenOption - Boolean to enable/disable flatten, or an object with a 'background' property.
 * @returns {this} Returns the current instance for chaining.
 */
function setFlattenOption(flattenOption) {
  // If flattenOption is a boolean, use isBlobOrFileLikeObject; otherwise, default to true
  this.options.flatten = _A.bool(flattenOption) ? flattenOption : true;

  // If flattenOption is an object, set the background color option
  if (_A.object(flattenOption)) {
    this._setBackgroundColourOption("flattenBackground", flattenOption.background);
  }

  // Return the current instance for chaining
  return this;
}

module.exports = setFlattenOption;