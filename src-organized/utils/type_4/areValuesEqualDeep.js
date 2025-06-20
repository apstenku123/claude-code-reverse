/**
 * Determines if two values are deeply equal, with special handling for NaN and custom comparison logic.
 *
 * @param {any} firstValue - The first value to compare.
 * @param {any} secondValue - The second value to compare.
 * @param {Function} customizer - Optional customizer function for comparison.
 * @param {Object} comparisonContext - Context object to track recursion and references.
 * @param {boolean} strictComparison - Whether to use strict comparison (===) or not.
 * @returns {boolean} True if the values are considered deeply equal, false otherwise.
 */
function areValuesEqualDeep(firstValue, secondValue, customizer, comparisonContext, strictComparison) {
  // Fast path: strictly equal values
  if (firstValue === secondValue) {
    return true;
  }

  // Handle null/undefined and non-object types
  // Also, if neither value is an object (cacheElementDataIfApplicable), check for NaN equality
  if (
    firstValue == null ||
    secondValue == null ||
    (!isObjectLike(firstValue) && !isObjectLike(secondValue))
  ) {
    // NaN is not equal to itself, so this checks if both are NaN
    return firstValue !== firstValue && secondValue !== secondValue;
  }

  // Delegate to deep comparison helper
  return deepEqualHelper(
    firstValue,
    secondValue,
    customizer,
    comparisonContext,
    areValuesEqualDeep,
    strictComparison
  );
}

// Helper to check if a value is object-like (not null and typeof 'object' or 'function')
function isObjectLike(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

// Assume deepEqualHelper is imported or defined elsewhere
// module.exports = areValuesEqualDeep;
module.exports = areValuesEqualDeep;