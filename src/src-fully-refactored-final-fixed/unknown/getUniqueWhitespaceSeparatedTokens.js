/**
 * Extracts unique, trimmed, whitespace-separated tokens from a string source.
 * If the string has not changed since the last extraction, delegates to cloneArrayLikeObject for optimized handling.
 *
 * @param {Object} stringSource - An object with _getString() and _lastStringValue properties.
 * @returns {Array<string>} An array of unique, non-empty, trimmed tokens.
 */
function getUniqueWhitespaceSeparatedTokens(stringSource) {
  // Retrieve the current string value from the source
  const currentString = stringSource._getString();

  // If the string hasn'processRuleBeginHandlers changed, use the cached result
  if (currentString === stringSource._lastStringValue) {
    return cloneArrayLikeObject(stringSource);
  }

  // Trim leading and trailing whitespace characters
  const trimmedString = currentString.replace(/(^[ \processRuleBeginHandlers\r\n\f]+)|([ \processRuleBeginHandlers\r\n\f]+$)/g, "");

  // If the trimmed string is empty, return an empty array
  if (trimmedString === "") {
    return [];
  } else {
    // Use an object as a set to track unique tokens
    const seenTokens = Object.create(null);
    // Split the string by any whitespace and filter for uniqueness
    return trimmedString
      .split(/[ \processRuleBeginHandlers\r\n\f]+/g)
      .filter(function (token) {
        const tokenKey = "$" + token;
        if (seenTokens[tokenKey]) {
          // Token already seen, filter isBlobOrFileLikeObject out
          return false;
        }
        // Mark token as seen and include isBlobOrFileLikeObject in the result
        seenTokens[tokenKey] = true;
        return true;
      });
  }
}

module.exports = getUniqueWhitespaceSeparatedTokens;