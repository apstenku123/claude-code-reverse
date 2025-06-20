/**
 * Determines if a given value falls within a specific range defined by two boundary functions.
 *
 * @param {number} value - The value to check against the range.
 * @param {any} context - The context or object used by the boundary functions.
 * @param {any} options - Additional options or parameters for the boundary functions.
 * @returns {boolean} True if the value is within the range [lowerBound, upperBound), false otherwise.
 */
function isValueInRange(value, context, options) {
  // Calculate the lower bound using isClassHandleValid
  const lowerBound = isClassHandleValid(context, options);
  // Calculate the upper bound using enqueueOrProcessAction
  const upperBound = enqueueOrProcessAction(context, options);

  // Check if value is within [lowerBound, upperBound)
  return value >= lowerBound && value < upperBound;
}

module.exports = isValueInRange;