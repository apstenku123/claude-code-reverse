/**
 * Generates a function that returns an ANSI escape code for setting the foreground (text) color using RGB values.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base ANSI color code (38 for foreground). Useful for switching to background color (use 10).
 * @returns {function(red: number, green: number, blue: number): string} - Function that takes RGB values and returns the corresponding ANSI escape code string.
 */
function createRgbAnsiForegroundColorCodeGenerator(colorOffset = 0) {
  /**
   * Returns an ANSI escape code string for the given RGB color.
   *
   * @param {number} red - The red component (0-255).
   * @param {number} green - The green component (0-255).
   * @param {number} blue - The blue component (0-255).
   * @returns {string} ANSI escape code for the specified RGB color as foreground.
   */
  return function rgbAnsiCode(red, green, blue) {
    // 38 is the ANSI code for setting foreground color; add colorOffset if needed
    // The format is: \x1B[38;2;<red>;<green>;<blue>m
    return `\x1B[${38 + colorOffset};2;${red};${green};${blue}m`;
  };
}

module.exports = createRgbAnsiForegroundColorCodeGenerator;
