/**
 * Checks if the provided object is an instance of the Il class or constructor.
 *
 * @param {any} objectToCheck - The object to test against the Il constructor.
 * @returns {boolean} True if Il is defined and objectToCheck is an instance of Il, otherwise false.
 */
function isInstanceOfIl(objectToCheck) {
  // Ensure Il is defined and check if objectToCheck is an instance of Il
  return typeof Il !== 'undefined' && objectToCheck instanceof Il;
}

module.exports = isInstanceOfIl;