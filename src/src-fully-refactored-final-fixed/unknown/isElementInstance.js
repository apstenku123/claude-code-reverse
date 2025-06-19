/**
 * Checks if the provided value is an instance of the global Element class.
 *
 * @param {any} valueToCheck - The value to test for being an Element instance.
 * @returns {boolean} True if Element is defined and valueToCheck is an Element instance; otherwise, false.
 */
function isElementInstance(valueToCheck) {
  // Ensure the global Element constructor exists (e.g., in browser environments)
  // Then check if valueToCheck is an instance of Element using the isInstanceOfClass utility
  return typeof Element !== "undefined" && isInstanceOfClass(valueToCheck, Element);
}

module.exports = isElementInstance;