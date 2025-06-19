/**
 * Checks if the provided object exists and has a truthy `$use` property.
 *
 * @param {Object} sourceObject - The object to check for the `$use` property.
 * @returns {boolean} Returns true if `sourceObject` exists and its `$use` property is truthy; otherwise, false.
 */
function hasUseProperty(sourceObject) {
  // Ensure the object exists and has a truthy `$use` property
  return Boolean(sourceObject) && Boolean(sourceObject.$use);
}

module.exports = hasUseProperty;