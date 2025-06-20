/**
 * Generates an ANSI escape code string for setting the foreground RGB color in terminal output.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base color code (38 for foreground, 48 for background).
 * @returns {function} a function that takes red, green, and blue values and returns the corresponding ANSI escape code string.
 *
 * @example
 * const rgbColorCode = createAnsiRgbColorCode();
 * const ansiString = rgbColorCode(255, 100, 50); // '\x1B[38;2;255;100;50m'
 */
const createAnsiRgbColorCode = (colorOffset = 0) => {
  /**
   * Returns the ANSI escape code for the specified RGB color.
   *
   * @param {number} red - The red component (0-255).
   * @param {number} green - The green component (0-255).
   * @param {number} blue - The blue component (0-255).
   * @returns {string} The ANSI escape code string for the RGB color.
   */
  return (red, green, blue) => {
    // 38 is the base code for foreground color; adding colorOffset allows for background (48) or other codes
    return `\x1B[${38 + colorOffset};2;${red};${green};${blue}m`;
  };
};

module.exports = createAnsiRgbColorCode;
