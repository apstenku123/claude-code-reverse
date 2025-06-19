/**
 * Determines the appropriate typed array constructor based on the provided size value.
 *
 * This function checks the given size and returns the corresponding typed array constructor:
 * - Returns Uint8Array if size <= 2^8
 * - Returns Uint16Array if size <= 2^16
 * - Returns Uint32Array if size <= 2^32
 * - Returns Ll (custom type) if size <= Number.MAX_SAFE_INTEGER
 * - Returns null if the size is invalid or exceeds safe integer limits
 *
 * @param {number} size - The size value to check for an appropriate typed array constructor.
 * @returns {Function|null} The constructor function for the appropriate typed array, Ll, or null if not applicable.
 */
function getTypedArrayConstructorForSize(size) {
  // Validate the size using the isPositiveInteger function (assumed to check for valid, positive, safe integer)
  if (!isPositiveInteger(size)) {
    return null;
  }

  // Check for Uint8Array (size <= 2^8)
  if (size <= Math.pow(2, 8)) {
    return Uint8Array;
  }

  // Check for Uint16Array (size <= 2^16)
  if (size <= Math.pow(2, 16)) {
    return Uint16Array;
  }

  // Check for Uint32Array (size <= 2^32)
  if (size <= Math.pow(2, 32)) {
    return Uint32Array;
  }

  // Check for custom type Ll (size <= Number.MAX_SAFE_INTEGER)
  if (size <= Number.MAX_SAFE_INTEGER) {
    return Ll;
  }

  // If size exceeds all supported ranges, return null
  return null;
}

module.exports = getTypedArrayConstructorForSize;