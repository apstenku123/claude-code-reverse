/**
 * Checks if the provided value exists in the global 'pn' array.
 *
 * @param {any} valueToCheck - The value to search for in the 'pn' array.
 * @returns {boolean} True if the value exists in 'pn', otherwise false.
 */
function isValueInPnList(valueToCheck) {
  // Assumes 'pn' is a globally defined array
  return pn.includes(valueToCheck);
}

module.exports = isValueInPnList;