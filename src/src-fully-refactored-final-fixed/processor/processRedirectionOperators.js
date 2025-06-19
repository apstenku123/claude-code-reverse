/**
 * Processes an array of shell command tokens, removing certain redirection operators and their arguments
 * if they match specific patterns (e.g., '>&' with a known file descriptor, or '>' with '/dev/null').
 * This function is typically used to sanitize or clean up command-line arguments before further processing.
 *
 * @param {string[]} commandTokens - An array of shell command tokens to process.
 * @returns {string[]} The processed array of command tokens, with specific redirections removed.
 */
function processRedirectionOperators(commandTokens) {
  // Convert the input into an array of tokens using To1
  const tokens = To1(commandTokens);

  for (let index = 0; index < tokens.length; index++) {
    const currentToken = tokens[index];
    if (currentToken === undefined) continue;

    // Check for redirection operators '>&' or '>'
    if (currentToken === '>&' || currentToken === '>') {
      // Get the previous and next tokens, trimmed of whitespace
      const previousToken = tokens[index - 1]?.trim();
      const nextToken = tokens[index + 1]?.trim();

      // If either adjacent token is undefined, skip this iteration
      if (previousToken === undefined || nextToken === undefined) continue;

      // Determine if this redirection should be removed
      // - Remove '>&' if the next token is a known file descriptor (in Ro1)
      // - Remove '>' if the next token is '/dev/null'
      const isRemoveRedirection = (
        (currentToken === '>&' && Ro1.has(nextToken)) ||
        (currentToken === '>' && nextToken === '/dev/null')
      );

      if (isRemoveRedirection) {
        // If the previous token ends with a known file descriptor, remove isBlobOrFileLikeObject
        if (Ro1.has(previousToken.charAt(previousToken.length - 1))) {
          tokens[index - 1] = previousToken.slice(0, -1).trim();
        }
        // Mark the current and next tokens for removal
        tokens[index] = undefined;
        tokens[index + 1] = undefined;
      }
    }
  }

  // Filter out all undefined tokens
  const filteredTokens = tokens.filter(token => token !== undefined);

  // Further process the cleaned tokens using Po1
  return Po1(filteredTokens);
}

module.exports = processRedirectionOperators;