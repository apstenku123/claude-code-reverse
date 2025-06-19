/**
 * Checks if any key in the given object exists in the ss2 array.
 *
 * @param {Object} objectToCheck - The object whose keys will be checked against the ss2 array.
 * @returns {boolean} True if at least one key from the object exists in ss2, otherwise false.
 */
function hasMatchingKeyInList(objectToCheck) {
  // Get all keys from the object and check if any of them are included in ss2
  return Object.keys(objectToCheck).some(key => ss2.includes(key));
}

module.exports = hasMatchingKeyInList;