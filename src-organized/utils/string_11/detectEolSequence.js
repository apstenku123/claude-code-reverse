/**
 * Detects the end-of-line (EOL) sequence used in a given string.
 *
 * Iterates through the input string to find the first occurrence of an EOL character or sequence.
 * Recognizes '\r\n', '\r', and '\n' as valid EOLs. If none are found, returns the default EOL
 * sequence specified in the options object, or '\n' if not specified.
 *
 * @param {Object} [options] - Optional configuration object that may specify a default EOL sequence.
 * @param {string} input - The string to inspect for EOL sequences.
 * @returns {string} The detected EOL sequence, or the default if none found.
 */
function detectEolSequence(options, input) {
  for (let index = 0; index < input.length; index++) {
    const currentChar = input.charAt(index);

    // Check for '\r' (carriage return)
    if (currentChar === "\r") {
      // Check if next character is '\n' (Windows EOL)
      if (index + 1 < input.length && input.charAt(index + 1) === "\n") {
        return "\r\n";
      }
      // Standalone '\r' (old Mac EOL)
      return "\r";
    } else if (currentChar === "\n") {
      // Standalone '\n' (Unix/Linux EOL)
      return "\n";
    }
  }
  // Return default EOL from options if provided, otherwise '\n'
  return (options && options.eol) || "\n";
}

module.exports = detectEolSequence;