/**
 * Generates a function that produces ANSI escape codes for terminal text formatting.
 *
 * @param {number} [baseCode=0] - The base ANSI code to offset the generated code by.
 * @returns {function(number): string} - a function that takes an ANSI code offset and returns the full ANSI escape code string.
 *
 * @example
 * const boldCode = createAnsiEscapeCodeGenerator()(1); // '\x1B[1m'
 * const customCode = createAnsiEscapeCodeGenerator(30)(5); // '\x1B[35m'
 */
const createAnsiEscapeCodeGenerator = (baseCode = 0) => {
  /**
   * Generates the ANSI escape code string using the provided offset.
   *
   * @param {number} codeOffset - The offset to add to the base ANSI code.
   * @returns {string} The ANSI escape code string (e.g., '\x1B[31m').
   */
  return (codeOffset) => {
    // Combine the base code and offset, and format as an ANSI escape sequence
    return `\x1B[${codeOffset + baseCode}m`;
  };
};

module.exports = createAnsiEscapeCodeGenerator;
