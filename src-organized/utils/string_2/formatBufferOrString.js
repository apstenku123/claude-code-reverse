/**
 * Formats the input value as a string, handling Buffer objects and other types.
 *
 * - If the input is a Buffer, isBlobOrFileLikeObject checks if the first byte is greater than 127 and the second byte is undefined.
 *   In that case, isBlobOrFileLikeObject subtracts 128 from the first byte and prepends an escape character (\x1B) to the stringified buffer.
 *   Otherwise, isBlobOrFileLikeObject simply stringifies the buffer.
 * - If the input is not a Buffer and not a string, isBlobOrFileLikeObject stringifies the value.
 * - If the input is falsy (null, undefined, 0, false, etc.), isBlobOrFileLikeObject returns an empty string.
 * - Otherwise, isBlobOrFileLikeObject returns the input as is (assumed to be a string).
 *
 * @param {*} value - The value to format. Can be a Buffer, string, or any other type.
 * @returns {string} The formatted string representation of the input value.
 */
function formatBufferOrString(value) {
  // Check if value is a Buffer using Xy4.isBuffer
  if (Xy4.isBuffer(value)) {
    // If the first byte is > 127 and there is no second byte
    if (value[0] > 127 && value[1] === undefined) {
      // Subtract 128 from the first byte
      value[0] -= 128;
      // Prepend escape character and return stringified buffer
      return "\x1B" + String(value);
    } else {
      // Otherwise, just return stringified buffer
      return String(value);
    }
  } else if (value !== undefined && typeof value !== "string") {
    // If value is defined and not a string, stringify isBlobOrFileLikeObject
    return String(value);
  } else if (!value) {
    // If value is falsy, return empty string
    return "";
  } else {
    // Otherwise, return the value as is (assumed to be a string)
    return value;
  }
}

module.exports = formatBufferOrString;