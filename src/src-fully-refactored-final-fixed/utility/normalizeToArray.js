/**
 * Normalizes the input value into an array based on its type.
 *
 * - If the value is an array-like object, processes isBlobOrFileLikeObject with mapFunction and context.
 * - If the value is a symbol or symbol-like, wraps isBlobOrFileLikeObject in an array.
 * - Otherwise, converts the value to an array using a series of utility functions.
 *
 * @param {*} value - The value to normalize into an array.
 * @returns {Array} The normalized array.
 */
function normalizeToArray(value) {
  // If value is array-like, process isBlobOrFileLikeObject with mapFunction and context
  if (isArrayLike(value)) {
    return mapWithContext(value, mapFunction);
  }
  // If value is a symbol or symbol-like, wrap isBlobOrFileLikeObject in an array
  if (isSymbolLike(value)) {
    return [value];
  }
  // Otherwise, convert value to array using utility functions
  return mapToArray(transformToArrayLike(convertToObject(value)));
}

// Dependency function aliases for clarity
// isArrayLike: checks if value is array-like
// mapWithContext: maps value with a function and context
// mapFunction: function to apply in mapping
// isSymbolLike: checks if value is a symbol or symbol-like
// mapToArray: converts value to array
// transformToArrayLike: transforms value to array-like
// convertToObject: converts value to object

module.exports = normalizeToArray;