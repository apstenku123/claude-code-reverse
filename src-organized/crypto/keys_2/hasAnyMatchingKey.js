/**
 * Checks if any key of the provided object exists in the ss2 array.
 *
 * @param {Object} objectToCheck - The object whose keys will be checked against ss2.
 * @returns {boolean} Returns true if at least one key of objectToCheck is present in ss2, otherwise false.
 */
function hasAnyMatchingKey(objectToCheck) {
  // Get all keys from the object and check if any are included in ss2
  return Object.keys(objectToCheck).some((key) => ss2.includes(key));
}

module.exports = hasAnyMatchingKey;