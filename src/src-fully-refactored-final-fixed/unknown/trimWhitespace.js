/**
 * Removes leading and trailing whitespace characters from the input string.
 * Handles environments where String.prototype.trim may not be available by using a regular expression fallback.
 *
 * @param {string} inputString - The string to be trimmed of whitespace.
 * @returns {string} The input string with leading and trailing whitespace removed.
 */
function trimWhitespace(inputString) {
  // Check if the input has a native trim method (modern JS engines)
  if (typeof inputString.trim === 'function') {
    return inputString.trim();
  }
  // Fallback for environments without String.prototype.trim
  // Removes all leading and trailing whitespace, including special unicode spaces
  return inputString.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
}

module.exports = trimWhitespace;
