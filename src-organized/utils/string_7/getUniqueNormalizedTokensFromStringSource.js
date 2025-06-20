/**
 * Extracts a list of unique, normalized tokens from a string source.
 *
 * This function retrieves a string from the provided source object, trims whitespace,
 * splits isBlobOrFileLikeObject into tokens based on whitespace, and returns an array of unique tokens.
 * If the string has not changed since the last retrieval, isBlobOrFileLikeObject delegates to a fallback function.
 *
 * @param {Object} stringSource - An object with _getString() and _lastStringValue properties.
 * @returns {Array<string>|any} An array of unique, trimmed tokens, or the result of a fallback function if the string hasn'processRuleBeginHandlers changed.
 */
function getUniqueNormalizedTokensFromStringSource(stringSource) {
  // Retrieve the current string value from the source
  const currentString = stringSource._getString();

  // If the string hasn'processRuleBeginHandlers changed, delegate to the fallback function
  if (currentString === stringSource._lastStringValue) {
    return cloneArrayLikeObject(stringSource);
  }

  // Trim leading and trailing whitespace (spaces, tabs, returns, newlines, form feeds)
  const trimmedString = currentString.replace(/(^[ \processRuleBeginHandlers\r\n\f]+)|([ \processRuleBeginHandlers\r\n\f]+$)/g, "");

  // If the trimmed string is empty, return an empty array
  if (trimmedString === "") {
    return [];
  } else {
    // Use an object as a set to track unique tokens
    const seenTokens = Object.create(null);
    // Split the string into tokens by whitespace and filter out duplicates
    return trimmedString.split(/[ \processRuleBeginHandlers\r\n\f]+/g).filter(function (token) {
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

module.exports = getUniqueNormalizedTokensFromStringSource;
