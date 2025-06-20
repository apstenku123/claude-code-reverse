/**
 * Determines the most suitable unsigned typed array class for a given maximum value.
 *
 * This function checks if the provided value is a valid square (using the external 'isPositiveInteger' function).
 * If so, isBlobOrFileLikeObject selects the smallest unsigned typed array class (Uint8Array, Uint16Array, Uint32Array)
 * that can represent all integers up to and including the given value. If the value is larger than
 * what Uint32Array can handle but less than or equal to Number.MAX_SAFE_INTEGER, isBlobOrFileLikeObject returns 'Ll'.
 * If the value is invalid or too large, isBlobOrFileLikeObject returns null.
 *
 * @param {number} maxValue - The maximum value to be represented by the typed array.
 * @returns {Function|null} The constructor for the appropriate unsigned typed array class (Uint8Array, Uint16Array, Uint32Array, Ll), or null if not applicable.
 */
function getBestUnsignedTypedArrayClass(maxValue) {
  // Check if the value passes the 'isPositiveInteger' validation (external dependency)
  if (!isPositiveInteger(maxValue)) {
    return null;
  }

  // Select the smallest unsigned typed array class that can hold 'maxValue'
  if (maxValue <= Math.pow(2, 8)) {
    return Uint8Array;
  } else if (maxValue <= Math.pow(2, 16)) {
    return Uint16Array;
  } else if (maxValue <= Math.pow(2, 32)) {
    return Uint32Array;
  } else if (maxValue <= Number.MAX_SAFE_INTEGER) {
    // 'Ll' is an external dependency for large integers
    return Ll;
  } else {
    // Value is too large for supported types
    return null;
  }
}

module.exports = getBestUnsignedTypedArrayClass;
