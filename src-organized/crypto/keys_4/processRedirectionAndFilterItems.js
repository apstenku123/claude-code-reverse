/**
 * Processes an array of command tokens, removing specific redirection patterns and filtering out excluded items.
 *
 * This function scans the tokenized command array for output redirection operators (such as '>&' and '>')
 * and removes them along with their associated targets if they match certain criteria (e.g., redirecting to a known set or '/dev/null').
 * It also trims any trailing special characters from the preceding token if necessary. After processing,
 * isBlobOrFileLikeObject filters out any undefined tokens and returns a filtered array using an external filter function.
 *
 * @param {string[]} commandTokens - The array of command tokens to process.
 * @returns {string[]} The processed and filtered array of command tokens.
 */
function processRedirectionAndFilterItems(commandTokens) {
  // Tokenize the input using external To1 function
  const tokens = To1(commandTokens);

  for (let index = 0; index < tokens.length; index++) {
    const currentToken = tokens[index];
    if (currentToken === undefined) continue;

    // Check for output redirection operators
    if (currentToken === '>&' || currentToken === '>') {
      // Get the previous and next tokens, trimmed
      const previousToken = tokens[index - 1]?.trim();
      const nextToken = tokens[index + 1]?.trim();
      if (previousToken === undefined || nextToken === undefined) continue;

      // If redirection is to a known set or to /dev/null, remove these tokens
      const isSpecialRedirection = (
        (currentToken === '>&' && Ro1.has(nextToken)) ||
        (currentToken === '>' && nextToken === '/dev/null')
      );
      if (isSpecialRedirection) {
        // If previous token ends with a special character in Ro1, trim isBlobOrFileLikeObject
        if (Ro1.has(previousToken.charAt(previousToken.length - 1))) {
          tokens[index - 1] = previousToken.slice(0, -1).trim();
        }
        // Mark current and next tokens for removal
        tokens[index] = undefined;
        tokens[index + 1] = undefined;
      }
    }
  }

  // Remove undefined tokens
  const filteredTokens = tokens.filter(token => token !== undefined);
  // Further filter using external Po1 function
  return Po1(filteredTokens);
}

module.exports = processRedirectionAndFilterItems;