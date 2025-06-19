/**
 * Generates a function that returns an ANSI escape code string for coloring terminal text.
 *
 * @param {number} [foregroundOffset=0] - Optional offset to add to the base foreground color code (38).
 * @returns {function(number): string} - a function that takes a color code (0-255) and returns the corresponding ANSI escape code string.
 */
const createAnsiColorCodeGenerator = (foregroundOffset = 0) => {
  /**
   * Returns an ANSI escape code string for the specified 8-bit color code.
   *
   * @param {number} colorCode - The 8-bit color code (0-255) to use for the foreground color.
   * @returns {string} The ANSI escape code string for the specified color.
   */
  return (colorCode) => {
    // 38 is the ANSI code for setting foreground color; add the optional offset
    // 5 indicates that the color is specified using 8-bit (256) color mode
    // colorCode is the actual color value (0-255)
    return `\x1B[${38 + foregroundOffset};5;${colorCode}m`;
  };
};

module.exports = createAnsiColorCodeGenerator;
