/**
 * Determines if the given array of command tokens, after processing for redirection and filtering,
 * contains more than one item and is not excluded by the provided exclusion check.
 *
 * @param {string[]} commandTokens - The array of command tokens to process and evaluate.
 * @returns {boolean} True if the processed tokens array has more than one item and is not excluded; otherwise, false.
 */
function hasMultipleFilteredTokensAndNotExcluded(commandTokens) {
  // Process the command tokens to remove redirection patterns and filter out excluded items
  const filteredTokens = processRedirectionAndFilterItems(commandTokens);
  // Check if more than one token remains after filtering
  const hasMultipleTokens = filteredTokens.length > 1;
  // Check if the commandTokens are not excluded by the external exclusion function
  const isNotExcluded = !isValidParsedCommand(commandTokens);
  // Return true only if both conditions are met
  return hasMultipleTokens && isNotExcluded;
}

module.exports = hasMultipleFilteredTokensAndNotExcluded;