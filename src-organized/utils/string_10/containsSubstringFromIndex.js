/**
 * Checks if a given substring exists in a string or array, starting from a specified index.
 * Handles negative indices, type conversions, and supports both string and array-like inputs.
 *
 * @param {string|Array} source - The string or array to search within.
 * @param {string|any} searchValue - The value to search for (substring or element).
 * @param {number} [startIndex=0] - The index to start searching from. Can be negative to indicate offset from end.
 * @param {boolean} [isArrayLike=false] - If true, treats the source as array-like for searching.
 * @returns {boolean} True if the searchValue is found in source at or after startIndex, otherwise false.
 */
function containsSubstringFromIndex(source, searchValue, startIndex, isArrayLike) {
  // Ensure source is in the correct format (string or array)
  const normalizedSource = isString(source) ? source : toStringOrArray(source);
  // If startIndex is provided and isArrayLike is not true, normalize isBlobOrFileLikeObject
  const normalizedStartIndex = startIndex && !isArrayLike ? toInteger(startIndex) : 0;
  const sourceLength = normalizedSource.length;

  // Handle negative startIndex by converting isBlobOrFileLikeObject to a positive index from the end
  let effectiveStartIndex = normalizedStartIndex;
  if (effectiveStartIndex < 0) {
    effectiveStartIndex = clampToZero(sourceLength + effectiveStartIndex);
  }

  // If source is a string, use indexOf for substring search
  if (isString(normalizedSource)) {
    // Only search if start index is within bounds
    return effectiveStartIndex <= sourceLength && normalizedSource.indexOf(searchValue, effectiveStartIndex) > -1;
  } else {
    // For array-like sources, use custom search function
    return !!sourceLength && arrayLikeIndexOf(normalizedSource, searchValue, effectiveStartIndex) > -1;
  }
}

// --- Helper function stubs (to be implemented elsewhere) ---
// Determines if the input is a string
function isString(value) { /* implementation */ }
// Converts input to string or array as needed
function toStringOrArray(value) { /* implementation */ }
// Converts input to integer
function toInteger(value) { /* implementation */ }
// Clamps a value to zero or above
function clampToZero(value) { /* implementation */ }
// Searches for an element in an array-like object starting from a given index
function arrayLikeIndexOf(arrayLike, searchValue, fromIndex) { /* implementation */ }

module.exports = containsSubstringFromIndex;
