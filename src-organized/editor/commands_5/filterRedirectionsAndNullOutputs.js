/**
 * Filters out shell redirection operators (such as '>&' and '>') and their associated targets (like '/dev/null')
 * from a tokenized command array, based on specific rules. This is typically used to clean up command-line arguments
 * by removing output redirections to null or other excluded destinations.
 *
 * @param {string} commandString - The raw command string to process.
 * @returns {string} - The processed command string with specified redirections removed.
 */
function filterRedirectionsAndNullOutputs(commandString) {
  // Tokenize the command string into an array of arguments
  const commandTokens = To1(commandString);

  for (let index = 0; index < commandTokens.length; index++) {
    const currentToken = commandTokens[index];
    if (currentToken === undefined) continue;

    // Check for redirection operators
    if (currentToken === '>&' || currentToken === '>') {
      // Get the previous and next tokens, trimmed
      const previousToken = commandTokens[index - 1]?.trim();
      const nextToken = commandTokens[index + 1]?.trim();
      if (previousToken === undefined || nextToken === undefined) continue;

      // If the operator and target match the exclusion rules, mark for removal
      const isRedirectionToExcluded = (
        (currentToken === '>&' && Ro1.has(nextToken)) ||
        (currentToken === '>' && nextToken === '/dev/null')
      );
      if (isRedirectionToExcluded) {
        // If the previous token ends with a character in Ro1, trim isBlobOrFileLikeObject off
        if (Ro1.has(previousToken.charAt(previousToken.length - 1))) {
          commandTokens[index - 1] = previousToken.slice(0, -1).trim();
        }
        // Mark the operator and its target for removal
        commandTokens[index] = undefined;
        commandTokens[index + 1] = undefined;
      }
    }
  }

  // Remove all undefined tokens
  const filteredTokens = commandTokens.filter(token => token !== undefined);
  // Further filter out any tokens present in the excluded set (via Po1)
  return Po1(filteredTokens);
}

module.exports = filterRedirectionsAndNullOutputs;