/**
 * Formats text according to the specified mode and caches the result for efficiency.
 *
 * @param {string} text - The input text to be formatted.
 * @param {number} width - The width or configuration parameter for formatting.
 * @param {string} mode - The formatting mode (e.g., 'wrap', 'truncate', 'truncate-middle', 'truncate-start').
 * @returns {string} The formatted text, either from cache or newly processed.
 */
function formatTextWithCaching(text, width, mode) {
  // Create a unique cache key based on input parameters
  const cacheKey = text + String(width) + String(mode);
  // Attempt to retrieve the formatted result from cache
  let cachedResult = tQ0[cacheKey];
  if (cachedResult) {
    return cachedResult;
  }

  let formattedText = text;

  // If mode is 'wrap', process the text using zA
  if (mode === "wrap") {
    formattedText = zA(text, width, {
      trim: false,
      hard: true
    });
  }

  // If mode is any kind of 'truncate', process accordingly
  if (mode.startsWith("truncate")) {
    // Default truncation position is 'end'
    let truncatePosition = "end";
    if (mode === "truncate-middle") {
      truncatePosition = "middle";
    } else if (mode === "truncate-start") {
      truncatePosition = "start";
    }
    // Truncate the text using truncateStringToWidth with the specified position
    formattedText = truncateStringToWidth(text, width, {
      position: truncatePosition
    });
  }

  // Cache the formatted result for future calls
  tQ0[cacheKey] = formattedText;
  return formattedText;
}

module.exports = formatTextWithCaching;