/**
 * Checks if the provided object has a 'port' property.
 *
 * @param {object} objectToCheck - The object to check for the 'port' property.
 * @returns {boolean} True if the object has a 'port' property, false otherwise.
 */
function hasPortProperty(objectToCheck) {
  // Use the 'in' operator to check for the existence of the 'port' property
  return 'port' in objectToCheck;
}

module.exports = hasPortProperty;