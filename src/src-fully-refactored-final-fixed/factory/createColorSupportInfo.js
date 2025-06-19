/**
 * Creates an object describing the level of color support based on the provided level.
 *
 * @param {number} colorSupportLevel - The color support level (0 = none, 1 = basic, 2 = 256 colors, 3 = 16 million colors).
 * @returns {object|boolean} An object with color support details if color is supported, or false if not supported.
 */
function createColorSupportInfo(colorSupportLevel) {
  // If no color support, return false
  if (colorSupportLevel === 0) return false;

  // Return an object describing the color support capabilities
  return {
    level: colorSupportLevel, // The color support level
    hasBasic: true, // Basic color support is always true if level > 0
    has256: colorSupportLevel >= 2, // 256 color support if level >= 2
    has16m: colorSupportLevel >= 3 // 16 million color support if level >= 3
  };
}

module.exports = createColorSupportInfo;