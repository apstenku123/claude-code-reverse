/**
 * Extracts a key from a string that may be in bracket notation or colon-separated format.
 *
 * If the string starts with '[', extracts the substring inside the brackets.
 * Otherwise, if the string contains ':', extracts the substring before the first colon.
 * If neither, returns the original string.
 *
 * @param {string} inputString - The string to extract the key from.
 * @returns {string} The extracted key or the original string if no brackets or colon are found.
 */
function extractKeyFromBracketOrColonString(inputString) {
  // Check if the string starts with a bracket
  if (inputString[0] === "[") {
    const closingBracketIndex = inputString.indexOf("]");
    // Call rs with a boolean indicating if the closing bracket was found
    rs(closingBracketIndex !== -1);
    // Extract and return the substring inside the brackets
    return inputString.substring(1, closingBracketIndex);
  }

  // Find the index of the first colon
  const colonIndex = inputString.indexOf(":");
  // If no colon is found, return the original string
  if (colonIndex === -1) return inputString;
  // Otherwise, return the substring before the colon
  return inputString.substring(0, colonIndex);
}

module.exports = extractKeyFromBracketOrColonString;