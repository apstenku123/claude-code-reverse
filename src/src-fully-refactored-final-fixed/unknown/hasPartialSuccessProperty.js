/**
 * Checks if the provided object has its own 'partialSuccess' property.
 *
 * @param {object} targetObject - The object to check for the 'partialSuccess' property.
 * @returns {boolean} True if 'partialSuccess' is an own property of the object, false otherwise.
 */
function hasPartialSuccessProperty(targetObject) {
  // Use Object.prototype.hasOwnProperty to avoid issues with objects that may override hasOwnProperty
  return Object.prototype.hasOwnProperty.call(targetObject, "partialSuccess");
}

module.exports = hasPartialSuccessProperty;