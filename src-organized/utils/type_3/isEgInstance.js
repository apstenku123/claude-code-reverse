/**
 * Checks if the provided object is an instance of the Eg class.
 *
 * @param {any} objectToCheck - The object to test against the Eg class.
 * @returns {boolean} True if objectToCheck is an instance of Eg, otherwise false.
 */
function isEgInstance(objectToCheck) {
  // Use instanceof to determine if the object is an instance of Eg
  return objectToCheck instanceof Eg;
}

module.exports = isEgInstance;