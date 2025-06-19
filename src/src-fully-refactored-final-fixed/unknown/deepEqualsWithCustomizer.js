/**
 * Performs a deep equality check between two values, with support for custom comparison logic.
 *
 * This function first checks for strict equality. If both values are null or not objects, isBlobOrFileLikeObject checks for NaN equality.
 * Otherwise, isBlobOrFileLikeObject delegates to a custom deep equality function, passing along a customizer and stack to handle recursion and circular references.
 *
 * @param {any} valueA - The first value to compare.
 * @param {any} valueB - The second value to compare.
 * @param {Function} customizer - Optional function to customize comparisons.
 * @param {Object} stack - Tracks traversed objects to handle circular references.
 * @param {Function} deepEqualFunc - The recursive deep equality function (usually this function itself).
 * @param {any} additionalArg - Additional argument passed to the deep equality function (purpose depends on implementation).
 * @returns {boolean} True if the values are deeply equal, false otherwise.
 */
function deepEqualsWithCustomizer(valueA, valueB, customizer, stack, deepEqualFunc, additionalArg) {
  // Check for strict equality first (handles primitives and reference equality)
  if (valueA === valueB) {
    return true;
  }

  // If either value is null/undefined or neither is an object, check for NaN equality
  if (
    valueA == null ||
    valueB == null ||
    (!isObject(valueA) && !isObject(valueB))
  ) {
    // Only true if both are NaN
    return valueA !== valueA && valueB !== valueB;
  }

  // Delegate to the custom deep equality function
  return deepEqualCustom(valueA, valueB, customizer, stack, deepEqualFunc, additionalArg);
}

// Helper function to check if a value is a non-null object
function isObject(value) {
  return typeof value === 'object' && value !== null;
}

// Placeholder for the actual deep equality function (should be implemented elsewhere)
// function deepEqualCustom(valueA, valueB, customizer, stack, deepEqualFunc, additionalArg) { ... }

module.exports = deepEqualsWithCustomizer;