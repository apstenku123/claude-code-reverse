/**
 * Escapes all backslashes and newline characters in the input string.
 *
 * This function replaces every backslash (\\) with two backslashes (\\\\),
 * and every newline character (\n) with the string '\\n'.
 *
 * @param {string} inputString - The string to escape backslashes and newlines in.
 * @returns {string} The escaped string with backslashes and newlines replaced.
 */
function escapeBackslashesAndNewlines(inputString) {
  // Replace all backslashes with double backslashes
  // Then replace all newline characters with the string '\n'
  return inputString.replace(/\\/g, "\\\\").replace(/\n/g, "\\n");
}

module.exports = escapeBackslashesAndNewlines;