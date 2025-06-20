/**
 * Generates a function that creates ANSI escape codes for setting the foreground (text) color in RGB format.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base foreground color code (38). Useful for switching between foreground (38) and background (48) colors.
 * @returns {function(red: number, green: number, blue: number): string} a function that takes red, green, and blue color values and returns the corresponding ANSI escape code string.
 */
function createRgbForegroundAnsiCodeGenerator(colorOffset = 0) {
  /**
   * Generates an ANSI escape code for the given RGB color values.
   *
   * @param {number} red - The red component (0-255) of the color.
   * @param {number} green - The green component (0-255) of the color.
   * @param {number} blue - The blue component (0-255) of the color.
   * @returns {string} The ANSI escape code string for the specified RGB color.
   */
  return function generateAnsiCode(red, green, blue) {
    // 38 is the ANSI code for setting foreground color; add colorOffset if needed
    // The format is: '\x1B[38;2;<red>;<green>;<blue>m'
    return `\x1B[${38 + colorOffset};2;${red};${green};${blue}m`;
  };
}

module.exports = createRgbForegroundAnsiCodeGenerator;
