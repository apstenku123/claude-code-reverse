/**
 * Generates an ANSI escape sequence for setting a true color (24-bit) foreground color in the terminal.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base foreground color code (38). Defaults to 0.
 * @returns {function(red: number, green: number, blue: number): string} - a function that accepts red, green, and blue color values and returns the ANSI escape sequence string.
 *
 * @example
 * const getRedText = createTrueColorForegroundEscapeSequence();
 * const redTextEscape = getRedText(255, 0, 0); // '\x1B[38;2;255;0;0m'
 */
const createTrueColorForegroundEscapeSequence = (colorOffset = 0) => {
  /**
   * Returns the ANSI escape sequence for the specified RGB foreground color.
   *
   * @param {number} red - The red component (0-255).
   * @param {number} green - The green component (0-255).
   * @param {number} blue - The blue component (0-255).
   * @returns {string} The ANSI escape sequence for the given RGB color.
   */
  return (red, green, blue) => {
    // 38 is the ANSI code for setting foreground color; add colorOffset if provided
    // 2 indicates that the color is specified in 24-bit RGB
    // The format is: '\x1B[38;2;<red>;<green>;<blue>m'
    return `\x1B[${38 + colorOffset};2;${red};${green};${blue}m`;
  };
};

module.exports = createTrueColorForegroundEscapeSequence;
