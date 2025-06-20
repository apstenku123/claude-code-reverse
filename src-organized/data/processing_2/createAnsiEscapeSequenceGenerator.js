/**
 * Generates a function that produces ANSI escape sequences based on provided processors.
 *
 * @param {Function} processInteractionEntries - Function that processes input arguments and returns a numeric code.
 * @param {number} ansiCodeOffset - Numeric value to be added to the result of the processor function.
 * @returns {Function} Function that accepts any number of arguments, processes them, and returns an ANSI escape sequence string.
 */
const createAnsiEscapeSequenceGenerator = (processInteractionEntries, ansiCodeOffset) => {
  /**
   * Generates an ANSI escape sequence string using the processor and offset.
   *
   * @param {...any} args - Arguments to be processed by the processor function.
   * @returns {string} ANSI escape sequence string.
   */
  return (...args) => {
    // Process the arguments to get the base code, add the offset, and format as ANSI escape sequence
    const ansiCode = processInteractionEntries(...args) + ansiCodeOffset;
    return `\x1B[${ansiCode}m`;
  };
};

module.exports = createAnsiEscapeSequenceGenerator;