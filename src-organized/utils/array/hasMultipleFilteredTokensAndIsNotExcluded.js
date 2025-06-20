/**
 * Determines if the given command token array, after processing redirections and filtering,
 * contains more than one token and is not excluded by the external exclusion check.
 *
 * @param {string[]} commandTokens - An array of command tokens to process and check.
 * @returns {boolean} True if there are multiple filtered tokens and the tokens are not excluded; otherwise, false.
 */
function hasMultipleFilteredTokensAndIsNotExcluded(commandTokens) {
  // Process the command tokens to remove redirections and filter out excluded items
  const filteredTokens = processRedirectionAndFilterItems(commandTokens);

  // Check if more than one token remains after filtering
  const hasMultipleTokens = filteredTokens.length > 1;

  // Check if the tokens are not excluded by the external exclusion function
  const isNotExcluded = !isValidParsedCommand(commandTokens);

  // Return true only if both conditions are met
  return hasMultipleTokens && isNotExcluded;
}

module.exports = hasMultipleFilteredTokensAndIsNotExcluded;