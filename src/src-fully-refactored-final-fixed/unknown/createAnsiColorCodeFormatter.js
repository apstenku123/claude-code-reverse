/**
 * Generates a function that formats RGB color values into an ANSI escape code string for colored terminal output.
 *
 * @param {Function} rgbExtractor - a function that, given any arguments, returns an array of three numbers representing RGB values.
 * @param {number} colorOffset - An integer offset to be added to the base ANSI color code (38 for foreground, 48 for background).
 * @returns {Function} a formatter function that accepts any arguments, extracts RGB values, and returns a formatted ANSI escape code string.
 */
function createAnsiColorCodeFormatter(rgbExtractor, colorOffset) {
  return function formatAnsiColorCode(...args) {
    // Extract RGB values using the provided extractor function
    const rgbValues = rgbExtractor(...args); // Expects [isWildcardOrX, extractNestedPropertyOrArray, createPropertyAccessor]

    // Construct the ANSI escape code string
    // 38 is for foreground color, 48 for background; colorOffset allows switching
    // '\x1B[' is the escape character, 'm' ends the code
    // Example: '\x1B[38;2;255;0;0m' for bright red foreground
    return `\x1B[${38 + colorOffset};2;${rgbValues[0]};${rgbValues[1]};${rgbValues[2]}m`;
  };
}

module.exports = createAnsiColorCodeFormatter;