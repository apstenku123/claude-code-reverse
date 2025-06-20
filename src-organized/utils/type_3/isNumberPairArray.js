/**
 * Checks if the provided value is an array of exactly two numbers.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} True if value is an array of length 2 and both elements are numbers, otherwise false.
 */
function isNumberPairArray(value) {
  // Check if value is an array
  if (!Array.isArray(value)) {
    return false;
  }

  // Check if array has exactly two elements
  if (value.length !== 2) {
    return false;
  }

  // Check if both elements are numbers
  const [firstElement, secondElement] = value;
  return typeof firstElement === "number" && typeof secondElement === "number";
}

module.exports = isNumberPairArray;
