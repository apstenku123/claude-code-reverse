/**
 * Constructs an ANSI escape sequence string using the provided code.
 *
 * @param {string} ansiCode - The ANSI code to be inserted into the escape sequence.
 * @returns {string} The formatted ANSI escape sequence string.
 */
const formatAnsiEscapeSequence = (ansiCode) => {
  // aQ0 is assumed to be an array where the first element is the escape sequence prefix (e.g., '\u001b[')
  return `${aQ0[0]}[${ansiCode}m`;
};

module.exports = formatAnsiEscapeSequence;