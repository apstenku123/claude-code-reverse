/**
 * Checks if the provided object has a value property equal to the initial version placeholder string "<0.0.0-0".
 *
 * @param {Object} versionObject - The object to check. Should have a 'value' property.
 * @returns {boolean} Returns true if the value is the initial version placeholder, false otherwise.
 */
const isInitialVersionPlaceholder = (versionObject) => {
  // Check if the value property is exactly the placeholder string
  return versionObject.value === "<0.0.0-0";
};

module.exports = isInitialVersionPlaceholder;
