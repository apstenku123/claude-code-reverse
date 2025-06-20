/**
 * Determines if the given shell command input, after processing redirection operators,
 * contains more than one token and does not require special handling.
 *
 * @param {string[]} commandTokens - An array of shell command tokens to be checked.
 * @returns {boolean} True if the processed command has more than one token and does not require special handling; otherwise, false.
 */
function hasMultipleTokensWithoutSpecialHandling(commandTokens) {
  // Process the command tokens to remove specific redirection operators and their arguments
  const sanitizedTokens = processRedirectionOperators(commandTokens);

  // Check if there is more than one token after sanitization
  const hasMultipleTokens = sanitizedTokens.length > 1;

  // Determine if the command requires special handling
  const requiresSpecialHandling = isValidParsedCommand(commandTokens);

  // Return true only if there are multiple tokens and no special handling is required
  return hasMultipleTokens && !requiresSpecialHandling;
}

module.exports = hasMultipleTokensWithoutSpecialHandling;