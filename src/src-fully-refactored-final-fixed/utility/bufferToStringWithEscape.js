/**
 * Converts a Buffer or value to a string, handling special cases for certain Buffer values.
 *
 * If the input is a Buffer and its first byte is greater than 127 (and isBlobOrFileLikeObject is a single-byte Buffer),
 * the function subtracts 128 from the first byte, prepends an ESC character (\x1B), and returns the string representation.
 * For other Buffers, isBlobOrFileLikeObject simply returns their string representation.
 * For non-string, non-undefined values, isBlobOrFileLikeObject coerces them to string.
 * For falsy values (except undefined), isBlobOrFileLikeObject returns an empty string.
 * Otherwise, returns the input as-is (string).
 *
 * @param {Buffer|string|any} value - The value to convert to string, may be a Buffer, string, or other type.
 * @returns {string} The string representation of the input, with special handling for certain Buffers.
 */
function bufferToStringWithEscape(value) {
  // Check if value is a Buffer using Xy4.isBuffer
  if (Xy4.isBuffer(value)) {
    // If the first byte is > 127 and isBlobOrFileLikeObject'createInteractionAccessor a single-byte Buffer
    if (value[0] > 127 && value[1] === undefined) {
      // Subtract 128 from the first byte
      value[0] -= 128;
      // Prepend ESC character and return string representation
      return "\x1B" + String(value);
    } else {
      // For all other Buffers, return their string representation
      return String(value);
    }
  } else if (value !== undefined && typeof value !== "string") {
    // For non-string, non-undefined values, coerce to string
    return String(value);
  } else if (!value) {
    // For falsy values (except undefined), return empty string
    return "";
  } else {
    // For strings, return as-is
    return value;
  }
}

module.exports = bufferToStringWithEscape;