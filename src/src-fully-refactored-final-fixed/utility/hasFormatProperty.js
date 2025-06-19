/**
 * Checks if the provided object has a 'format' property.
 *
 * @param {Object} objectToCheck - The object to check for the 'format' property.
 * @returns {boolean} True if the object has a 'format' property, otherwise false.
 */
function hasFormatProperty(objectToCheck) {
  // Use the 'in' operator to check if 'format' exists as a property on the object
  return "format" in objectToCheck;
}

module.exports = hasFormatProperty;