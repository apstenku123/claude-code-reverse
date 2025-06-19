/**
 * Creates a function that generates an ANSI escape code for setting an RGB foreground color in the terminal.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base foreground color code (38). Use 0 for standard foreground, 60 for background, etc.
 * @returns {function(red: number, green: number, blue: number): string} Function that takes RGB values and returns the corresponding ANSI escape code.
 */
const createAnsiRgbColorCodeGenerator = (colorOffset = 0) => {
  /**
   * Generates an ANSI escape code for a given RGB color.
   *
   * @param {number} red - The red component (0-255).
   * @param {number} green - The green component (0-255).
   * @param {number} blue - The blue component (0-255).
   * @returns {string} The ANSI escape code string for the specified RGB color.
   */
  return (red, green, blue) => {
    // 38 is the ANSI code for setting foreground color; add colorOffset if needed
    // '2' specifies that the color is in RGB format
    // The format is: '\x1B[38;2;<red>;<green>;<blue>m'
    return `\x1B[${38 + colorOffset};2;${red};${green};${blue}m`;
  };
};

module.exports = createAnsiRgbColorCodeGenerator;
