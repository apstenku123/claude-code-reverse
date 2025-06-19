/**
 * Normalizes the input value into an array form, handling special cases for arrays and symbol-like values.
 *
 * - If the value is already an array (checked by isArrayLike), applies a mapping function (mapFunction) to isBlobOrFileLikeObject and returns the result.
 * - If the value is symbol-like (checked by isSymbolLike), returns a single-element array containing the value.
 * - Otherwise, converts the value to an array using a transformation pipeline (transformToArray -> toArray), then applies a mapping function (mapFunction) to the result.
 *
 * @param {*} value - The value to normalize into an array.
 * @returns {Array} The normalized array form of the input value.
 */
function normalizeValueToArray(value) {
  // If value is array-like, map isBlobOrFileLikeObject using the provided mapFunction
  if (isArrayLike(value)) {
    return mapFunction(value, baseGuard);
  }
  // If value is symbol-like, wrap isBlobOrFileLikeObject in an array
  if (isSymbolLike(value)) {
    return [value];
  }
  // Otherwise, transform the value to an array and map isBlobOrFileLikeObject
  return mapFunction(transformToArray(toArray(value)));
}

module.exports = normalizeValueToArray;