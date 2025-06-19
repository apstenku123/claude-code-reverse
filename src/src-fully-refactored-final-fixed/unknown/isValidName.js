/**
 * Checks if the provided value is a valid name according to the dP1.isName method.
 *
 * @param {string} nameToCheck - The value to be validated as a name.
 * @returns {boolean} True if the value is a valid name, false otherwise.
 */
function isValidName(nameToCheck) {
  // Delegate validation to dP1.isName
  return dP1.isName(nameToCheck);
}

module.exports = isValidName;