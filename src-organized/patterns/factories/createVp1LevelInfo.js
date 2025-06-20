/**
 * Creates an object describing the VP1 level capabilities based on the provided level.
 *
 * @param {number} level - The VP1 level to evaluate. Must be a non-zero integer.
 * @returns {object|boolean} An object with capability flags if level is non-zero, otherwise false.
 */
function createVp1LevelInfo(level) {
  // If the level is 0, return false to indicate no capabilities
  if (level === 0) {
    return false;
  }

  // Return an object describing the capabilities for the given level
  return {
    level: level, // The provided VP1 level
    hasBasic: true, // All non-zero levels have basic capability
    has256: level >= 2, // Levels 2 and above have 256-color support
    has16m: level >= 3 // Levels 3 and above have 16 million color support
  };
}

module.exports = createVp1LevelInfo;