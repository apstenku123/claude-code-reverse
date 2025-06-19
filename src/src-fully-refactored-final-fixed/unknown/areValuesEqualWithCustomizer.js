/**
 * Determines if two values are equal, with support for custom comparison logic and deep comparison.
 *
 * @param {any} valueA - The first value to compare.
 * @param {any} valueB - The second value to compare.
 * @param {Function} [customizer] - Optional customizer function to control comparison logic.
 * @param {any} [comparisonContext] - Optional context or stack for recursive/deep comparisons.
 * @param {boolean} [isPartial] - Optional flag indicating if partial comparison is allowed.
 * @returns {boolean} True if the values are considered equal, false otherwise.
 */
function areValuesEqualWithCustomizer(valueA, valueB, customizer, comparisonContext, isPartial) {
  // If the values are strictly equal, return true immediately
  if (valueA === valueB) {
    return true;
  }

  // If either value is null/undefined, or both are not objects (primitives),
  // check for NaN equality (since NaN !== NaN, but handleMissingDoctypeError want to treat them as equal)
  if (
    valueA == null ||
    valueB == null ||
    (!isObjectLike(valueA) && !isObjectLike(valueB))
  ) {
    // Only true if both are NaN
    return valueA !== valueA && valueB !== valueB;
  }

  // Otherwise, perform a deep or custom comparison
  return deepEqualWithCustomizer(
    valueA,
    valueB,
    customizer,
    comparisonContext,
    areValuesEqualWithCustomizer,
    isPartial
  );
}

module.exports = areValuesEqualWithCustomizer;
