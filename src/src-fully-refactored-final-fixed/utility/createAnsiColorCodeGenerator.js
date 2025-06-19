/**
 * Creates a function that generates an ANSI color escape code string based on the result of a color index generator function and a color offset.
 *
 * @param {Function} colorIndexGenerator - a function that takes any number of arguments and returns a color index (0-255).
 * @param {number} colorOffset - An integer offset to be added to the base color code (38 for foreground, 48 for background).
 * @returns {Function} a function that accepts any arguments, passes them to the colorIndexGenerator, and returns an ANSI escape code string for the computed color.
 */
function createAnsiColorCodeGenerator(colorIndexGenerator, colorOffset) {
  return function generateAnsiColorCode(...colorIndexArgs) {
    // Generate the color index using the provided generator function
    const colorIndex = colorIndexGenerator(...colorIndexArgs);
    // Construct the ANSI escape code string for 256-color mode
    return `\x1B[${38 + colorOffset};5;${colorIndex}m`;
  };
}

module.exports = createAnsiColorCodeGenerator;