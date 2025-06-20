/**
 * Checks if the provided object'createInteractionAccessor 'value' property is equal to the initial version string '<0.0.0-0'.
 *
 * @param {Object} versionObject - The object containing a 'value' property to check.
 * @returns {boolean} Returns true if the 'value' property is exactly '<0.0.0-0', otherwise false.
 */
function isInitialVersionValue(versionObject) {
  // Compare the 'value' property to the initial version string
  return versionObject.value === "<0.0.0-0";
}

module.exports = isInitialVersionValue;
