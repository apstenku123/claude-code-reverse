/**
 * Determines the appropriate typed array class or custom class for a given maximum integer value.
 *
 * This function checks the provided maximum value and returns the corresponding
 * typed array constructor (Uint8Array, Uint16Array, Uint32Array), a custom class (Ll),
 * or null if the value is not valid or exceeds the safe integer limit.
 *
 * @param {number} maxValue - The maximum integer value to check.
 * @returns {Function|null} The constructor for the appropriate typed array, the custom class Ll, or null if not applicable.
 */
function getTypedArrayClassForSize(maxValue) {
  // Validate the input using the isPositiveInteger function (assumed to check if maxValue is a valid integer)
  if (!isPositiveInteger(maxValue)) {
    return null;
  }

  // Return the appropriate typed array class based on the value range
  if (maxValue <= Math.pow(2, 8)) {
    return Uint8Array;
  } else if (maxValue <= Math.pow(2, 16)) {
    return Uint16Array;
  } else if (maxValue <= Math.pow(2, 32)) {
    return Uint32Array;
  } else if (maxValue <= Number.MAX_SAFE_INTEGER) {
    // Ll is assumed to be a custom class for large integers
    return Ll;
  } else {
    // Value exceeds safe integer range or is invalid
    return null;
  }
}

module.exports = getTypedArrayClassForSize;
