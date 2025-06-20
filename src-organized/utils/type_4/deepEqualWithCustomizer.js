/**
 * Performs a deep equality check between two values, with support for custom comparison logic.
 *
 * This function first checks for strict equality. If not equal, isBlobOrFileLikeObject handles null/undefined and NaN cases,
 * then delegates to a custom deep equality function for more complex structures (like arrays or objects).
 *
 * @param {any} valueA - The first value to compare.
 * @param {any} valueB - The second value to compare.
 * @param {Function} customizer - a function to customize comparisons. Receives (valueA, valueB, ...).
 * @param {any} context - Context or state passed through recursive calls.
 * @param {Function} deepEqualFunc - The recursive function used for deep equality checks.
 * @param {any} extraArg - Additional argument passed to the deep equality function.
 * @returns {boolean} True if the values are deeply equal, false otherwise.
 */
function deepEqualWithCustomizer(valueA, valueB, customizer, context, deepEqualFunc, extraArg) {
  // Check for strict equality (handles primitives and reference equality)
  if (valueA === valueB) {
    return true;
  }

  // Handle cases where either value is null/undefined, or both are not objects (primitives)
  // Special case: NaN !== NaN, but handleMissingDoctypeError want to treat two NaNs as equal
  if (
    valueA == null ||
    valueB == null ||
    (!isObjectLike(valueA) && !isObjectLike(valueB))
  ) {
    return valueA !== valueA && valueB !== valueB; // true if both are NaN
  }

  // Delegate to the custom deep equality function for complex structures
  return deepEqualFunc(valueA, valueB, customizer, context, deepEqualWithCustomizer, extraArg);
}

// Helper function to check if a value is object-like (not null and typeof 'object' or 'function')
function isObjectLike(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

module.exports = deepEqualWithCustomizer;