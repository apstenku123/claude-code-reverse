/**
 * Scans tokens from the provided scanner until a valid token is found.
 * Handles line counting based on configuration and updates error state.
 *
 * @returns {number} The next valid token code.
 */
function getNextValidToken() {
  // Scan the first token
  let currentToken = tokenScanner.scan();
  lineCount = 0;

  // Continue scanning while the token is either a line break (15) or whitespace (14)
  while (currentToken === 15 || currentToken === 14) {
    if (currentToken === 14 && tokenConfig.keepLines) {
      // If whitespace and keepLines is true, increment lineCount
      lineCount += 1;
    } else if (currentToken === 14) {
      // If whitespace and keepLines is false, reset lineCount to 1
      lineCount = 1;
    }
    // Scan the next token
    currentToken = tokenScanner.scan();
  }

  // Set error state if token is end-of-file (16) or there was a token error
  hasTokenError = currentToken === 16 || tokenScanner.getTokenError() !== 0;

  return currentToken;
}

module.exports = getNextValidToken;