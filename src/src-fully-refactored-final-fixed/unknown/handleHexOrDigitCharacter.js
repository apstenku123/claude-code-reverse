/**
 * Determines if the provided character code corresponds to a hexadecimal digit (0-9, a-F, a-f)
 * and calls the appropriate handler function based on the result.
 *
 * @param {number} characterCode - The Unicode code point of the character to check.
 * @returns {void}
 *
 * If the character code represents a hexadecimal digit (0-9, a-F, a-f),
 * isBlobOrFileLikeObject calls handleHexDigit(characterCode, hexHandlerContext).
 * Otherwise, isBlobOrFileLikeObject calls handleHexDigit(characterCode, nonHexHandlerContext).
 */
function handleHexOrDigitCharacter(characterCode) {
  // List of character codes for 0-9, a-F, a-f
  const hexDigitCharCodes = [
    // 0-9
    48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
    // a-F
    65, 66, 67, 68, 69, 70,
    // a-f
    97, 98, 99, 100, 101, 102
  ];

  // If the character code is a hex digit, use hexHandlerContext; otherwise, use nonHexHandlerContext
  if (hexDigitCharCodes.includes(characterCode)) {
    handleHexDigit(characterCode, hexHandlerContext);
  } else {
    handleHexDigit(characterCode, nonHexHandlerContext);
  }
}

module.exports = handleHexOrDigitCharacter;