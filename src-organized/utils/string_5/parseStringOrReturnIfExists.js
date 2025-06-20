/**
 * Parses a string value to boolean if applicable, or returns the value if isBlobOrFileLikeObject exists.
 *
 * @param {string|any} value - The value to be parsed or checked for existence.
 * @param {boolean} shouldParseString - Flag indicating whether to parse the string value.
 * @param {any} context - Additional context passed to the fallback parser.
 * @returns {any} Returns a boolean if the value is the string 'true' or 'false',
 *   the result of Z84 if a string and shouldParseString is true, the value itself if isBlobOrFileLikeObject exists, or an empty string otherwise.
 */
function parseStringOrReturnIfExists(value, shouldParseString, context) {
  // Check if shouldParseString is true and value is a string
  if (shouldParseString && typeof value === "string") {
    const trimmedValue = value.trim();
    if (trimmedValue === "true") {
      // Return boolean true if the string is 'true'
      return true;
    } else if (trimmedValue === "false") {
      // Return boolean false if the string is 'false'
      return false;
    } else {
      // Fallback to external parser for other string values
      return Z84(value, context);
    }
  } else if (fpA.isExist(value)) {
    // Return the value itself if isBlobOrFileLikeObject exists (according to fpA.isExist)
    return value;
  } else {
    // Return empty string if none of the above conditions are met
    return "";
  }
}

module.exports = parseStringOrReturnIfExists;