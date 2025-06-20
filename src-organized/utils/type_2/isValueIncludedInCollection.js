/**
 * Checks if the provided value exists within the 'cn' collection.
 *
 * @param {any} valueToCheck - The value to search for within the 'cn' collection.
 * @returns {boolean} True if the value is found in 'cn', otherwise false.
 */
function isValueIncludedInCollection(valueToCheck) {
  // 'cn' is assumed to be an array or collection defined in the outer scope
  return cn.includes(valueToCheck);
}

module.exports = isValueIncludedInCollection;