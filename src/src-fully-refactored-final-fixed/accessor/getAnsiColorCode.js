/**
 * Generates an ANSI escape code string for 256-color foreground colors.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base foreground color code (38).
 * @returns {function(number): string} - a function that takes a color code (0-255) and returns the corresponding ANSI escape code string.
 */
const getAnsiColorCode = (colorOffset = 0) => {
  /**
   * Returns the ANSI escape code for the given 256-color code.
   *
   * @param {number} colorCode - The 256-color code (0-255) to use for the foreground color.
   * @returns {string} The ANSI escape code string for the specified color.
   */
  return (colorCode) => {
    // 38 is the ANSI code for setting foreground color; add colorOffset if provided
    // 5 indicates that a 256-color code follows
    // colorCode is the actual color value (0-255)
    return `\x1B[${38 + colorOffset};5;${colorCode}m`;
  };
};

module.exports = getAnsiColorCode;
