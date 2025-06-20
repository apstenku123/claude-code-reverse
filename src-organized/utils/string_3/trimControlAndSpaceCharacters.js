/**
 * Removes leading and trailing control characters (UL+0000 to UL+001F) and spaces (UL+0020) from the input string.
 *
 * @param {string} inputString - The string to be trimmed of control characters and spaces.
 * @returns {string} The trimmed string with leading and trailing control characters and spaces removed.
 */
function trimControlAndSpaceCharacters(inputString) {
  // Use a regular expression to match and remove leading/trailing control characters and spaces
  // ^[\u0000-\u001F\u0020]+ matches one or more control characters or spaces at the start
  // [\u0000-\u001F\u0020]+$ matches one or more control characters or spaces at the end
  return inputString.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/g, "");
}

module.exports = trimControlAndSpaceCharacters;