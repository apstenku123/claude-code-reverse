/**
 * Checks if the provided object has an 'error' property defined (not undefined).
 *
 * @param {Object} objectToCheck - The object to check for the 'error' property.
 * @returns {boolean} True if the object exists and has an 'error' property (even if its value is null or false), otherwise false.
 */
function hasErrorProperty(objectToCheck) {
  // Ensure the object is not null or undefined and has an 'error' property (not undefined)
  return objectToCheck && objectToCheck.error !== undefined;
}

module.exports = hasErrorProperty;
