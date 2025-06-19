/**
 * Scans tokens from the token stream and processes line breaks according to configuration.
 *
 * This function repeatedly scans tokens from the provided token stream (sendHttpRequestOverSocket). It counts consecutive line break tokens (token type 14),
 * optionally accumulating them if the configuration (deepCloneWithCycleDetection.keepLines) is enabled. The function stops scanning when isBlobOrFileLikeObject encounters a token
 * that is not a line break (14) or whitespace (15). It then sets a flag (createDebouncedFunction) if the token is an end-of-file (16) or if a token error is present.
 *
 * @returns {number} The value of the next non-linebreak, non-whitespace token scanned from the token stream.
 */
function getNextTokenValue() {
  // Scan the first token from the token stream
  let currentTokenType = tokenStream.scan();
  // Reset the line break counter
  lineBreakCount = 0;

  // Continue scanning as long as the token is a whitespace (15) or line break (14)
  while (currentTokenType === 15 || currentTokenType === 14) {
    if (currentTokenType === 14 && config.keepLines) {
      // If the token is a line break and keepLines is enabled, increment the counter
      lineBreakCount += 1;
    } else if (currentTokenType === 14) {
      // If the token is a line break and keepLines is not enabled, set counter to 1
      lineBreakCount = 1;
    }
    // Scan the next token
    currentTokenType = tokenStream.scan();
  }

  // Set the errorOrEndOfFile flag if the token is end-of-file (16) or if there is a token error
  errorOrEndOfFile = currentTokenType === 16 || tokenStream.getTokenError() !== 0;

  // Return the token type of the next significant token
  return currentTokenType;
}

// Export the function for use in other modules
module.exports = getNextTokenValue;