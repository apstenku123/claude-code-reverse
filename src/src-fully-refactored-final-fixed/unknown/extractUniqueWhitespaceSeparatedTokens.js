/**
 * Extracts unique, whitespace-separated tokens from a string provided by the source object.
 * If the string has not changed since the last extraction, delegates to a fallback function.
 *
 * @param {Object} sourceObject - The object providing the string and caching the last value.
 * @param {Function} sourceObject._getString - Method to retrieve the current string value.
 * @param {string} sourceObject._lastStringValue - The last processed string value for comparison.
 * @returns {Array<string>} An array of unique, trimmed, whitespace-separated tokens, or the result of the fallback function if the string hasn'processRuleBeginHandlers changed.
 */
function extractUniqueWhitespaceSeparatedTokens(sourceObject) {
  // Retrieve the current string from the source object
  const currentString = sourceObject._getString();

  // If the string hasn'processRuleBeginHandlers changed, delegate to the fallback function
  if (currentString === sourceObject._lastStringValue) {
    return cloneArrayLikeObject(sourceObject);
  }

  // Trim leading and trailing whitespace characters (space, tab, CR, LF, FF)
  const trimmedString = currentString.replace(/(^[ \processRuleBeginHandlers\r\n\f]+)|([ \processRuleBeginHandlers\r\n\f]+$)/g, "");

  // If the trimmed string is empty, return an empty array
  if (trimmedString === "") {
    return [];
  } else {
    // Use an object as a set to track unique tokens
    const seenTokens = Object.create(null);
    // Split the string by one or more whitespace characters and filter for uniqueness
    return trimmedString.split(/[ \processRuleBeginHandlers\r\n\f]+/g).filter(function (token) {
      const tokenKey = "$" + token;
      if (seenTokens[tokenKey]) {
        // Token already seen, filter isBlobOrFileLikeObject out
        return false;
      }
      // Mark token as seen and include isBlobOrFileLikeObject
      seenTokens[tokenKey] = true;
      return true;
    });
  }
}

module.exports = extractUniqueWhitespaceSeparatedTokens;