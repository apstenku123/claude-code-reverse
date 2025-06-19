/**
 * Determines if the given shell command tokens array, after removing redirection operators,
 * contains more than one token and does not match a specific redirection pattern.
 *
 * @param {string[]} commandTokens - Array of shell command tokens to be analyzed.
 * @returns {boolean} True if there are multiple tokens after processing and the tokens do not match the redirection pattern; otherwise, false.
 */
function hasMultipleTokensWithoutRedirection(commandTokens) {
  // Process the tokens to remove redirection operators and their arguments
  const sanitizedTokens = processRedirectionOperators(commandTokens);

  // Check if more than one token remains after sanitization
  const hasMultipleTokens = sanitizedTokens.length > 1;

  // Check if the original tokens do NOT match the redirection pattern
  const isNotRedirectionPattern = !isValidParsedCommand(commandTokens);

  // Return true only if both conditions are met
  return hasMultipleTokens && isNotRedirectionPattern;
}

module.exports = hasMultipleTokensWithoutRedirection;