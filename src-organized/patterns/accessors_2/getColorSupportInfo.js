/**
 * Returns an object describing the level of color support based on the provided level.
 *
 * @param {number} colorSupportLevel - The level of color support (0 = none, 1 = basic, 2 = 256 colors, 3 = 16 million colors).
 * @returns {Object|boolean} An object with color support details if level > 0, otherwise false.
 */
function getColorSupportInfo(colorSupportLevel) {
  // If no color support, return false
  if (colorSupportLevel === 0) return false;

  // Return an object describing the color support capabilities
  return {
    level: colorSupportLevel, // The provided color support level
    hasBasic: true, // Basic color support is always available if level > 0
    has256: colorSupportLevel >= 2, // 256-color support if level is 2 or higher
    has16m: colorSupportLevel >= 3 // 16 million color support if level is 3 or higher
  };
}

module.exports = getColorSupportInfo;