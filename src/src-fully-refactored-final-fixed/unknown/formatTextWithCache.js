/**
 * Formats a given text according to the specified mode and width, with caching for performance.
 *
 * @param {string} text - The text to format.
 * @param {number} width - The width to use for formatting (e.g., line length).
 * @param {string} mode - The formatting mode: 'wrap', 'truncate', 'truncate-middle', 'truncate-start', or other.
 * @returns {string} The formatted text, possibly retrieved from cache.
 */
function formatTextWithCache(text, width, mode) {
  // Create a unique cache key based on the arguments
  const cacheKey = text + String(width) + String(mode);
  // Attempt to retrieve the formatted result from cache
  const cachedResult = tQ0[cacheKey];
  if (cachedResult) {
    return cachedResult;
  }

  let formattedText = text;

  // If mode is 'wrap', use zA (zA)
  if (mode === "wrap") {
    formattedText = zA(text, width, {
      trim: false,
      hard: true
    });
  }

  // If mode is any kind of 'truncate', use truncateStringToWidth with the correct position
  if (mode.startsWith("truncate")) {
    let truncatePosition = "end";
    if (mode === "truncate-middle") {
      truncatePosition = "middle";
    } else if (mode === "truncate-start") {
      truncatePosition = "start";
    }
    formattedText = truncateStringToWidth(text, width, {
      position: truncatePosition
    });
  }

  // Store the result in cache for future calls
  tQ0[cacheKey] = formattedText;
  return formattedText;
}

module.exports = formatTextWithCache;