/**
 * Generates a function that returns an ANSI escape code for a foreground RGB color.
 *
 * @param {function} rgbExtractor - a function that takes any number of arguments and returns an array of three numbers representing RGB values.
 * @param {number} colorOffset - The offset to add to the base ANSI color code (38 for foreground, 48 for background).
 * @returns {function} a function that, when called with arguments, returns an ANSI escape code string for the specified RGB color.
 */
function createRgbAnsiColorCodeGenerator(rgbExtractor, colorOffset) {
  return (...args) => {
    // Extract the RGB values using the provided extractor function
    const rgbValues = rgbExtractor(...args); // [red, green, blue]
    // Construct the ANSI escape code for the RGB color
    return `\x1B[${38 + colorOffset};2;${rgbValues[0]};${rgbValues[1]};${rgbValues[2]}m`;
  };
}

module.exports = createRgbAnsiColorCodeGenerator;