/**
 * Processes an input command string, tokenizes isBlobOrFileLikeObject, removes specific redirection patterns,
 * and returns the cleaned command string. Handles cases like '>&' and '>' redirections,
 * especially when redirecting to /dev/null or other special tokens.
 *
 * @param {string} commandString - The input command string to process and clean.
 * @returns {string} The cleaned and processed command string.
 */
function processAndCleanCommandTokens(commandString) {
  // Tokenize the input command string using To1 (assumed to split into meaningful tokens)
  const commandTokens = To1(commandString);

  for (let tokenIndex = 0; tokenIndex < commandTokens.length; tokenIndex++) {
    const currentToken = commandTokens[tokenIndex];
    if (currentToken === undefined) continue;

    // Check for redirection operators
    if (currentToken === '>&' || currentToken === '>') {
      // Get the previous and next tokens, trimmed of whitespace
      const previousToken = commandTokens[tokenIndex - 1]?.trim();
      const nextToken = commandTokens[tokenIndex + 1]?.trim();

      // If either adjacent token is missing, skip this iteration
      if (previousToken === undefined || nextToken === undefined) continue;

      // Handle special redirection cases:
      // - '>&' followed by a token in Ro1
      // - '>' followed by '/dev/null'
      const isSpecialRedirection = (
        (currentToken === '>&' && Ro1.has(nextToken)) ||
        (currentToken === '>' && nextToken === '/dev/null')
      );

      if (isSpecialRedirection) {
        // If the previous token ends with a character in Ro1, remove that character
        if (Ro1.has(previousToken.charAt(previousToken.length - 1))) {
          commandTokens[tokenIndex - 1] = previousToken.slice(0, -1).trim();
        }
        // Mark the current and next tokens as undefined to remove them later
        commandTokens[tokenIndex] = undefined;
        commandTokens[tokenIndex + 1] = undefined;
      }
    }
  }

  // Filter out all undefined tokens
  const cleanedTokens = commandTokens.filter(token => token !== undefined);

  // Reconstruct the cleaned command string using Po1
  return Po1(cleanedTokens);
}

module.exports = processAndCleanCommandTokens;