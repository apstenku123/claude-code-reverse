/**
 * Formats a string based on the specified formatting mode and caches the result for future use.
 *
 * @param {string} inputString - The string to be formatted.
 * @param {number} maxLength - The maximum length or width for formatting.
 * @param {string} formatMode - The formatting mode (e.g., 'wrap', 'truncate', 'truncate-middle', 'truncate-start').
 * @returns {string} The formatted string, either retrieved from cache or newly processed.
 */
function formatAndCacheString(inputString, maxLength, formatMode) {
  // Generate a unique cache key based on the arguments
  const cacheKey = inputString + String(maxLength) + String(formatMode);

  // Attempt to retrieve the formatted string from cache
  let cachedResult = tQ0[cacheKey];
  if (cachedResult) {
    return cachedResult;
  }

  let formattedString = inputString;

  // If the format mode is 'wrap', use zA
  if (formatMode === "wrap") {
    formattedString = zA(inputString, maxLength, {
      trim: false,
      hard: true
    });
  }

  // If the format mode is any kind of 'truncate', use truncateStringToWidth with the correct position
  if (formatMode.startsWith("truncate")) {
    let truncatePosition = "end";
    if (formatMode === "truncate-middle") {
      truncatePosition = "middle";
    } else if (formatMode === "truncate-start") {
      truncatePosition = "start";
    }
    formattedString = truncateStringToWidth(inputString, maxLength, {
      position: truncatePosition
    });
  }

  // Cache the result for future calls
  tQ0[cacheKey] = formattedString;
  return formattedString;
}

module.exports = formatAndCacheString;