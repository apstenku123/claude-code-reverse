/**
 * Generates a function that returns an ANSI escape code string for setting the foreground color in 256-color terminals.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base foreground color code (38). Typically 0 for standard foreground, 60 for background.
 * @returns {function(number): string} - a function that takes a color code (0-255) and returns the corresponding ANSI escape code string.
 *
 * @example
 * const getAnsiColorCode = createAnsiColorCodeGenerator();
 * const redAnsiCode = getAnsiColorCode(196); // "\x1B[38;5;196m"
 */
const createAnsiColorCodeGenerator = (colorOffset = 0) => {
  /**
   * Returns an ANSI escape code string for the given 256-color code.
   *
   * @param {number} colorCode - The 256-color code (0-255) to use for the foreground color.
   * @returns {string} The ANSI escape code string for the specified color.
   */
  return (colorCode) => {
    // 38 is the ANSI code for setting foreground color; add offset if needed
    // 5 indicates 256-color mode; colorCode is the specific color
    return `\x1B[${38 + colorOffset};5;${colorCode}m`;
  };
};

module.exports = createAnsiColorCodeGenerator;
