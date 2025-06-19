/**
 * Checks if a given value is within a specific range defined by two boundary functions.
 *
 * @param {number} value - The value to check.
 * @param {any} context - The context or object used by the boundary functions.
 * @param {any} options - Additional options passed to the boundary functions.
 * @returns {boolean} True if the value is within the range, false otherwise.
 */
function isValueWithinRange(value, context, options) {
  // Lower boundary (inclusive)
  const lowerBound = isClassHandleValid(context, options);
  // Upper boundary (exclusive)
  const upperBound = enqueueOrProcessAction(context, options);

  // Check if value is within [lowerBound, upperBound)
  return value >= lowerBound && value < upperBound;
}

module.exports = isValueWithinRange;