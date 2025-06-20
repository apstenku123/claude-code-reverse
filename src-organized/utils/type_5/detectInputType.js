/**
 * Determines the type of the provided input value.
 *
 * Returns:
 *   2 if the input is a Buffer (when Buffer is available and checkBuffer is true)
 *   1 if the input is a Uint8Array
 *   0 if the input is a string
 *  -1 for all other types
 *
 * @param {any} inputValue - The value whose type is to be determined.
 * @param {boolean} [checkBuffer=true] - Whether to check for Buffer type (default: true).
 * @returns {number} Type code: 2 (Buffer), 1 (Uint8Array), 0 (string), -1 (other)
 */
function detectInputType(inputValue, checkBuffer = true) {
  // Check if input is a Buffer (only if Buffer is defined and checkBuffer is true)
  if (
    checkBuffer &&
    typeof Buffer !== "undefined" &&
    inputValue instanceof Buffer
  ) {
    return 2;
  }
  // Check if input is a Uint8Array
  if (inputValue instanceof Uint8Array) {
    return 1;
  }
  // Check if input is a string
  if (typeof inputValue === "string") {
    return 0;
  }
  // Input is of an unrecognized type
  return -1;
}

module.exports = detectInputType;
