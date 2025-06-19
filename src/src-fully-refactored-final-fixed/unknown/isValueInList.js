/**
 * Checks if the provided value exists within the predefined list `pn`.
 *
 * @param {string} valueToCheck - The value to search for in the `pn` list.
 * @returns {boolean} Returns true if the value exists in the list, otherwise false.
 */
function isValueInList(valueToCheck) {
  // Uses Array.prototype.includes to determine if valueToCheck is present in pn
  return pn.includes(valueToCheck);
}

module.exports = isValueInList;