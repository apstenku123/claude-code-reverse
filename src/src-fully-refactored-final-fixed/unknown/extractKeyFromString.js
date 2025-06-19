/**
 * Extracts a key or identifier from a formatted string.
 *
 * If the string starts with '[', extracts the substring between '[' and ']'.
 * Otherwise, if the string contains ':', extracts the substring before the first ':'.
 * If neither condition is met, returns the original string.
 *
 * @param {string} inputString - The string to extract the key from.
 * @returns {string} The extracted key or identifier.
 */
function extractKeyFromString(inputString) {
  // Check if the string starts with '['
  if (inputString[0] === "[") {
    const closingBracketIndex = inputString.indexOf("]");
    // Call 'rs' with a boolean indicating if ']' was found (side effect)
    rs(closingBracketIndex !== -1);
    // Extract the substring between '[' and ']'
    return inputString.substring(1, closingBracketIndex);
  }

  // Check for the presence of ':'
  const colonIndex = inputString.indexOf(":");
  if (colonIndex === -1) {
    // No colon found; return the original string
    return inputString;
  }

  // Extract the substring before the first ':'
  return inputString.substring(0, colonIndex);
}

module.exports = extractKeyFromString;