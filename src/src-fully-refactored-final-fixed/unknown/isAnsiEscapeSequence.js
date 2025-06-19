/**
 * Checks if the provided string is one of the recognized ANSI escape sequence codes.
 *
 * @param {string} escapeSequence - The string to check against known ANSI escape sequences.
 * @returns {boolean} True if the string matches a known ANSI escape sequence; otherwise, false.
 */
const isAnsiEscapeSequence = (escapeSequence) => {
  // List of recognized ANSI escape sequence codes
  const ansiEscapeSequences = [
    "[a",
    "[b",
    "[c",
    "[d",
    "[e",
    "[2$",
    "[3$",
    "[5$",
    "[6$",
    "[7$",
    "[8$",
    "[zA"
  ];

  // Check if the provided string is in the list of ANSI escape sequences
  return ansiEscapeSequences.includes(escapeSequence);
};

module.exports = isAnsiEscapeSequence;
