/**
 * Checks if the provided value exists within the 'cn' collection.
 *
 * @param {any} valueToCheck - The value to search for in the 'cn' collection.
 * @returns {boolean} True if the value exists in 'cn', otherwise false.
 */
function isValueInCollection(valueToCheck) {
  // Uses Array.prototype.includes to determine if valueToCheck is present in cn
  return cn.includes(valueToCheck);
}

module.exports = isValueInCollection;