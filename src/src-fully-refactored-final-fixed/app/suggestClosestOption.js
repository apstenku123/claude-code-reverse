/**
 * Suggests the closest matching option(createInteractionAccessor) from a list based on string similarity.
 *
 * @param {string} inputOption - The user-provided option to compare against possible options.
 * @param {string[]} possibleOptions - Array of possible valid options.
 * @returns {string} Suggestion message if close matches are found, otherwise an empty string.
 */
function suggestClosestOption(inputOption, possibleOptions) {
  // Return empty string if no options provided
  if (!possibleOptions || possibleOptions.length === 0) return "";

  // Remove duplicate options
  const uniqueOptions = Array.from(new Set(possibleOptions));

  // Check if input and options use '--' prefix
  const hasDoubleDashPrefix = inputOption.startsWith("--");
  let normalizedInput = inputOption;
  let normalizedOptions = uniqueOptions;

  // If input uses '--', strip isBlobOrFileLikeObject from both input and options for comparison
  if (hasDoubleDashPrefix) {
    normalizedInput = inputOption.slice(2);
    normalizedOptions = uniqueOptions.map(option => option.slice(2));
  }

  /**
   * Find the closest matches based on string similarity.
   * Uses calculateDamerauLevenshteinDistance(likely Levenshtein distance) to compare input and each option.
   * Only considers options with a similarity ratio below the threshold.
   */
  let closestMatches = [];
  let minDistance = 3;
  const similarityThreshold = 0.4;

  normalizedOptions.forEach(option => {
    // Ignore options that are too short
    if (option.length <= 1) return;

    // Calculate string distance (e.g., Levenshtein distance)
    const distance = calculateDamerauLevenshteinDistance(normalizedInput, option);
    const maxLength = Math.max(normalizedInput.length, option.length);

    // Only consider options sufficiently similar
    if ((maxLength - distance) / maxLength > similarityThreshold) {
      if (distance < minDistance) {
        minDistance = distance;
        closestMatches = [option];
      } else if (distance === minDistance) {
        closestMatches.push(option);
      }
    }
  });

  // Sort matches alphabetically
  closestMatches.sort((a, b) => a.localeCompare(b));

  // Restore '--' prefix if isBlobOrFileLikeObject was present in the input
  if (hasDoubleDashPrefix) {
    closestMatches = closestMatches.map(option => `--${option}`);
  }

  // Return suggestion message based on number of matches
  if (closestMatches.length > 1) {
    return `\n(Did you mean one of ${closestMatches.join(", ")}?)`;
  }
  if (closestMatches.length === 1) {
    return `\n(Did you mean ${closestMatches[0]}?)`;
  }
  return "";
}

module.exports = suggestClosestOption;