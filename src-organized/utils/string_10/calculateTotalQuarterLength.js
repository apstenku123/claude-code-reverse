/**
 * Calculates the total quarter length from the provided input.
 *
 * If the input is a string, returns one fourth of its length.
 * If the input is an array, iterates through each element and:
 *   - If the element is a 'text' object (as determined by isTextObject), adds one fourth of its text length.
 *   - If the element is a 'special' object (as determined by isSpecialObject), adds 1600.
 *   - Otherwise, ignores the element.
 * If the input is falsy, returns 0.
 *
 * @param {string|Array<Object>} input - The string or array of objects to process.
 * @returns {number} The total calculated quarter length.
 */
function calculateTotalQuarterLength(input) {
  if (!input) {
    // Return 0 for falsy input (null, undefined, empty string, etc.)
    return 0;
  }

  if (typeof input === "string") {
    // If input is a string, return one fourth of its length
    return getQuarterLength(input);
  }

  // If input is an array, process each element
  return input.reduce((total, element) => {
    if (isTextObject(element)) {
      // If element is a text object, add one fourth of its text length
      return total + getQuarterLength(element.text);
    } else if (isSpecialObject(element)) {
      // If element is a special object, add 1600
      return total + 1600;
    }
    // Otherwise, do not modify the total
    return total;
  }, 0);
}

module.exports = calculateTotalQuarterLength;
