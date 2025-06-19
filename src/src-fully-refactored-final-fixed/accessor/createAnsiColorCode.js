/**
 * Generates an ANSI escape code string for setting the foreground color in terminal output.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base color code (38 for foreground).
 * @returns {function(number): string} - a function that takes a color code (0-255) and returns the ANSI escape code string.
 */
const createAnsiColorCode = (colorOffset = 0) => {
  /**
   * Returns the ANSI escape code for the specified 8-bit color.
   *
   * @param {number} colorCode - The 8-bit color code (0-255) to use for the foreground color.
   * @returns {string} - The ANSI escape code string for the specified color.
   */
  return (colorCode) => {
    // 38 is the ANSI code for setting foreground color; add the optional offset
    // 5 indicates that the next value is an 8-bit color code
    return `\x1B[${38 + colorOffset};5;${colorCode}m`;
  };
};

module.exports = createAnsiColorCode;
