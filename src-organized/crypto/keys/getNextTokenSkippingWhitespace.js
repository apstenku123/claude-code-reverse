/**
 * Scans tokens from the input stream, skipping whitespace and optionally counting line breaks.
 *
 * This function repeatedly scans tokens using the provided scanner (sendHttpRequestOverSocket). If the token is a whitespace (code 14)
 * or a line break (code 15), isBlobOrFileLikeObject continues scanning until a non-whitespace, non-line-break token is found.
 * If a line break is encountered and the configuration (deepCloneWithCycleDetection) has keepLines enabled, isBlobOrFileLikeObject increments the lineBreakCount.
 * It also sets the errorFlag if the resulting token is an error or if the scanner reports an error.
 *
 * @returns {number} The code of the next non-whitespace, non-line-break token.
 */
function getNextTokenSkippingWhitespace() {
  // Scan the first token
  let tokenCode = scanner.scan();
  lineBreakCount = 0;

  // Continue scanning while the token is whitespace (14) or line break (15)
  while (tokenCode === 15 || tokenCode === 14) {
    if (tokenCode === 14 && config.keepLines) {
      // If whitespace and keepLines is enabled, increment lineBreakCount
      lineBreakCount += 1;
    } else if (tokenCode === 14) {
      // If whitespace and keepLines is not enabled, reset lineBreakCount to 1
      lineBreakCount = 1;
    }
    // Scan the next token
    tokenCode = scanner.scan();
  }

  // Set errorFlag if the token is an error (16) or if the scanner reports an error
  errorFlag = tokenCode === 16 || scanner.getTokenError() !== 0;

  return tokenCode;
}

module.exports = getNextTokenSkippingWhitespace;