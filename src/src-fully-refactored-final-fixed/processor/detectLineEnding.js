/**
 * Detects the line ending sequence used in a given string.
 *
 * Iterates through the provided text and returns the first encountered line ending:
 * - If a carriage return (\r) is followed by a line feed (\n), returns '\r\n'.
 * - If only a carriage return (\r) is found, returns '\r'.
 * - If only a line feed (\n) is found, returns '\n'.
 * If no line ending is found, returns the default line ending from the options object (if provided),
 * or '\n' as a fallback.
 *
 * @param {Object} [options] - Optional configuration object that may contain a default EOL string.
 * @param {string} text - The text to inspect for line endings.
 * @returns {string} The detected line ending sequence, or the default if none found.
 */
function detectLineEnding(options, text) {
  for (let index = 0; index < text.length; index++) {
    const currentChar = text.charAt(index);
    // Check for carriage return
    if (currentChar === "\r") {
      // Check if followed by line feed
      if (index + 1 < text.length && text.charAt(index + 1) === "\n") {
        return "\r\n";
      }
      return "\r";
    } else if (currentChar === "\n") {
      // Standalone line feed
      return "\n";
    }
  }
  // Return default EOL if provided, otherwise fallback to '\n'
  return (options && options.eol) || "\n";
}

module.exports = detectLineEnding;