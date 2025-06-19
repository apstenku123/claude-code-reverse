/**
 * Creates a function that generates an ANSI escape code for setting the foreground color using RGB values.
 *
 * @param {number} [colorOffset=0] - Optional offset to add to the base ANSI color code (38 for foreground).
 * @returns {function(number, number, number): string} - Function that takes red, green, and blue values and returns the ANSI escape code string.
 */
const createRgbAnsiColorCodeGenerator = (colorOffset = 0) => {
  /**
   * Generates an ANSI escape code for a foreground RGB color.
   *
   * @param {number} red - The red component (0-255).
   * @param {number} green - The green component (0-255).
   * @param {number} blue - The blue component (0-255).
   * @returns {string} The ANSI escape code string for the specified RGB color.
   */
  return (red, green, blue) => {
    // 38 is the ANSI code for setting foreground color; add colorOffset if provided
    // Format: \x1B[38;2;<red>;<green>;<blue>m
    return `\x1B[${38 + colorOffset};2;${red};${green};${blue}m`;
  };
};

module.exports = createRgbAnsiColorCodeGenerator;