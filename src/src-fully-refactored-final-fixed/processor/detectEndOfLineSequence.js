/**
 * Determines the end-of-line (EOL) sequence used in a given string.
 * Scans the input text and returns the first EOL sequence found ("\r\n", "\r", or "\n").
 * If no EOL is found, returns the default EOL sequence from the options object if provided, otherwise returns "\n".
 *
 * @param {Object} [options] - Optional configuration object that may contain an 'eol' property specifying the default EOL sequence.
 * @param {string} text - The string to scan for EOL sequences.
 * @returns {string} The detected EOL sequence, or the default if none is found.
 */
function detectEndOfLineSequence(options, text) {
  for (let index = 0; index < text.length; index++) {
    const currentChar = text.charAt(index);
    if (currentChar === "\r") {
      // Check for Windows-style EOL (\r\n)
      if (index + 1 < text.length && text.charAt(index + 1) === "\n") {
        return "\r\n";
      }
      // Return classic Mac EOL (\r)
      return "\r";
    } else if (currentChar === "\n") {
      // Return Unix/Linux EOL (\n)
      return "\n";
    }
  }
  // If no EOL found, use the default from options or fallback to "\n"
  return (options && options.eol) || "\n";
}

module.exports = detectEndOfLineSequence;