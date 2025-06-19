/**
 * Converts a Buffer or other value to a string representation with special handling for certain Buffer cases.
 *
 * If the input is a Buffer and its first byte is greater than 127 and isBlobOrFileLikeObject has only one byte,
 * the function subtracts 128 from the first byte and prepends an escape character (\x1B) to the stringified value.
 * For other Buffers, isBlobOrFileLikeObject simply stringifies them. For non-string, non-undefined values, isBlobOrFileLikeObject stringifies them.
 * For falsy values (except undefined), isBlobOrFileLikeObject returns an empty string. Otherwise, returns the value as is.
 *
 * @param {Buffer|string|any} value - The value to convert to a string. Can be a Buffer, string, or any other type.
 * @returns {string} The string representation of the input value, with special handling for certain Buffers.
 */
function convertBufferOrValueToString(value) {
  // Check if the input is a Buffer using the external Xy4.isBuffer method
  if (Xy4.isBuffer(value)) {
    // If the first byte is > 127 and there is only one byte in the Buffer
    if (value[0] > 127 && value[1] === undefined) {
      // Subtract 128 from the first byte
      value[0] -= 128;
      // Prepend escape character and return stringified Buffer
      return "\x1B" + String(value);
    } else {
      // For other Buffers, just stringify
      return String(value);
    }
  } else if (value !== undefined && typeof value !== "string") {
    // For non-string, non-undefined values, stringify
    return String(value);
  } else if (!value) {
    // For falsy values (except undefined), return empty string
    return "";
  } else {
    // For strings or other truthy values, return as is
    return value;
  }
}

module.exports = convertBufferOrValueToString;