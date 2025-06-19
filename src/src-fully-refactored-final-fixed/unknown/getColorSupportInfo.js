/**
 * Determines the level of color support and related capabilities.
 *
 * @param {number} colorSupportLevel - The color support level (0 = none, 1 = basic, 2 = 256 colors, 3 = 16 million colors).
 * @returns {false | {level: number, hasBasic: boolean, has256: boolean, has16m: boolean}} Returns false if no color support, otherwise an object describing the capabilities.
 */
function getColorSupportInfo(colorSupportLevel) {
  // If there is no color support, return false
  if (colorSupportLevel === 0) return false;

  // Return an object describing the color support capabilities
  return {
    level: colorSupportLevel,
    hasBasic: true, // Basic color support is always true if level > 0
    has256: colorSupportLevel >= 2, // 256 color support if level is 2 or higher
    has16m: colorSupportLevel >= 3 // 16 million color support if level is 3 or higher
  };
}

module.exports = getColorSupportInfo;