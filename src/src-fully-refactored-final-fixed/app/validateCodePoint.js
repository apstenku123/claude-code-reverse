/**
 * Validates that the provided value is a safe integer code point.
 * Throws a TypeError if the value is not a safe integer.
 *
 * @param {number} codePoint - The value to validate as a code point.
 * @throws {TypeError} If codePoint is not a safe integer.
 */
function validateCodePoint(codePoint) {
  // Check if the input is a safe integer (valid code point)
  if (!Number.isSafeInteger(codePoint)) {
    throw new TypeError(`Expected a code point, got \`${typeof codePoint}\`.`);
  }
}

module.exports = validateCodePoint;