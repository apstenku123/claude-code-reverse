/**
 * Generates a function that returns an ANSI escape code string for a given code offset.
 *
 * @param {number} baseCode - The base ANSI code to offset from. Defaults to 0 if not provided.
 * @returns {function(number): string} a function that takes a code offset and returns the ANSI escape code string.
 *
 * @example
 * const getRedTextCode = createAnsiEscapeCodeGenerator(30);
 * const ansiCode = getRedTextCode(1); // '\x1B[31m'
 */
const createAnsiEscapeCodeGenerator = (baseCode = 0) => {
  /**
   * Returns the ANSI escape code string for the given offset.
   *
   * @param {number} codeOffset - The offset to add to the base ANSI code.
   * @returns {string} The ANSI escape code string.
   */
  return (codeOffset) => {
    // Construct the ANSI escape code by adding the offset to the base code
    return `\x1B[${codeOffset + baseCode}m`;
  };
};

module.exports = createAnsiEscapeCodeGenerator;
