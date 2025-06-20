/**
 * Factory function that determines the level of color support based on the provided level.
 *
 * @param {number} colorSupportLevel - The numeric level of color support (0 = none, 1 = basic, 2 = 256 colors, 3 = 16 million colors).
 * @returns {false|object} Returns false if no color support, otherwise an object describing the supported color levels.
 */
function createColorSupportLevel(colorSupportLevel) {
  // If color support level is 0, return false (no color support)
  if (colorSupportLevel === 0) {
    return false;
  }

  // Return an object describing the color support capabilities
  return {
    level: colorSupportLevel, // The numeric color support level
    hasBasic: true,          // Always true if color support is present
    has256: colorSupportLevel >= 2, // True if 256 color support or higher
    has16m: colorSupportLevel >= 3  // True if 16 million color support
  };
}

module.exports = createColorSupportLevel;