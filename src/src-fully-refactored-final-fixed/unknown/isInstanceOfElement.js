/**
 * Checks if the provided value is an instance of the global Element class.
 *
 * @param {any} valueToCheck - The value to test for Element instance.
 * @returns {boolean} True if valueToCheck is an Element, false otherwise.
 */
function isInstanceOfElement(valueToCheck) {
  // Ensure the global Element constructor exists (e.g., in browser environments)
  // and use the external isInstanceOfClass function to check if valueToCheck is an instance of Element
  return typeof Element !== "undefined" && isInstanceOfClass(valueToCheck, Element);
}

module.exports = isInstanceOfElement;