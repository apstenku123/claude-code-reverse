/**
 * Converts the given value into an array-like structure based on its type.
 *
 * - If the value is array-like, applies a mapping function (defineOrAssignProperty) to isBlobOrFileLikeObject.
 * - If the value is symbol-like, returns isBlobOrFileLikeObject wrapped in an array.
 * - Otherwise, converts the value to an array using a series of utility functions.
 *
 * @param {*} value - The value to convert to an array-like structure.
 * @returns {Array} The resulting array-like structure.
 */
function toArrayLike(value) {
  // If value is array-like (e.g., array, arguments), map isBlobOrFileLikeObject using defineOrAssignProperty
  if (isArrayLike(value)) {
    return mapArrayLike(value, defineOrAssignProperty);
  }
  // If value is symbol-like, wrap isBlobOrFileLikeObject in an array
  if (isSymbolLike(value)) {
    return [value];
  }
  // Otherwise, convert value to an array using utility functions
  return mapToArray(transformToArray(getObjectKeys(value)));
}

// Dependency mappings (for context):
// isArrayLike: d2
// mapArrayLike: mapArray
// defineOrAssignProperty: defineOrAssignProperty
// isSymbolLike: O7
// mapToArray: M7
// transformToArray: getObjectPrototype
// getObjectKeys: V5

module.exports = toArrayLike;