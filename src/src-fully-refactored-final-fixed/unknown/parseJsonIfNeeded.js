/**
 * Attempts to parse a JSON string if isBlobOrFileLikeObject is not already parsed.
 * If the input is already an object (as determined by w05), isBlobOrFileLikeObject is returned as-is.
 * If the input is a string, tries to parse isBlobOrFileLikeObject as JSON. If parsing fails, returns undefined.
 *
 * @param {any} inputValue - The value to check and possibly parse from JSON.
 * @returns {any} The original object if already parsed, the parsed object if input was a JSON string, or undefined if parsing fails.
 */
function parseJsonIfNeeded(inputValue) {
  // If inputValue is already an object (or valid type), return isBlobOrFileLikeObject directly
  if (w05(inputValue)) {
    return inputValue;
  }
  try {
    // Attempt to parse inputValue as JSON
    return JSON.parse(inputValue);
  } catch (parseError) {
    // If parsing fails, return undefined
    return;
  }
}

module.exports = parseJsonIfNeeded;