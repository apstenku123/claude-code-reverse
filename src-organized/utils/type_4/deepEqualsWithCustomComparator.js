/**
 * Performs a deep equality check between two values, with support for custom comparison logic.
 * Handles special cases such as NaN, null, and custom object types, and delegates to a custom comparator for complex structures.
 *
 * @param {any} valueA - The first value to compare.
 * @param {any} valueB - The second value to compare.
 * @param {Function} customizer - Optional custom comparison function invoked for complex types.
 * @param {any} context - Optional context or state passed through recursive calls.
 * @param {Function} comparator - The recursive comparator function (typically this function itself).
 * @param {any} additionalArg - Additional argument passed to the custom comparator.
 * @returns {boolean} True if the values are considered deeply equal, false otherwise.
 */
function deepEqualsWithCustomComparator(
  valueA,
  valueB,
  customizer,
  context,
  comparator,
  additionalArg
) {
  // Fast path: strict equality
  if (valueA === valueB) {
    return true;
  }

  // Handle null/undefined and non-object types
  // Also handle NaN: NaN !== NaN, but handleMissingDoctypeError want deepEqualsWithCustomComparator(NaN, NaN) === true
  const isValueANullish = valueA == null;
  const isValueBNullish = valueB == null;
  const isValueAObject = isObjectLike(valueA);
  const isValueBObject = isObjectLike(valueB);

  if (
    isValueANullish ||
    isValueBNullish ||
    (!isValueAObject && !isValueBObject)
  ) {
    // Only true if both are NaN
    return valueA !== valueA && valueB !== valueB;
  }

  // Delegate to custom deep equality comparator for objects/arrays
  return customDeepEqual(
    valueA,
    valueB,
    customizer,
    context,
    comparator,
    additionalArg
  );
}

/**
 * Checks if a value is object-like (not null and typeof 'object' or 'function').
 * @param {any} value
 * @returns {boolean}
 */
function isObjectLike(value) {
  return typeof value === 'object' && value !== null;
}

// Placeholder for the actual deep equality function used in the original code
// Should be replaced with the real implementation
function customDeepEqual(a, b, customizer, context, comparator, additionalArg) {
  // ... implementation ...
  return false;
}

module.exports = deepEqualsWithCustomComparator;
