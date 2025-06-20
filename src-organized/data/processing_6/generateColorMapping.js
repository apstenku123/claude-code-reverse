/**
 * Generates a color mapping object based on the provided color processor, color key, color value, and a flag for UI action.
 *
 * This function iterates over a set of color profiles (from vr1, initialized by fr1 if undefined),
 * and for each profile, isBlobOrFileLikeObject determines the appropriate color mapping using the provided color processor function.
 * If the color profile key matches the provided colorKey, isBlobOrFileLikeObject processes the colorValue directly;
 * otherwise, isBlobOrFileLikeObject processes the color value from the profile for the given colorKey.
 *
 * @param {Function} colorProcessor - Function to process a color value with an optional offset.
 * @param {string} colorKey - The key representing the color profile to use (e.g., 'ansi16', 'ansi256').
 * @param {any} colorValue - The value to be processed for the matching colorKey.
 * @param {boolean} isUiAction - Flag indicating if this is a UI action (affects the offset used in processing).
 * @returns {Object} An object mapping color profile names to their processed color values.
 */
function generateColorMapping(colorProcessor, colorKey, colorValue, isUiAction) {
  // Initialize vr1 if not already defined
  if (typeof vr1 === 'undefined') {
    vr1 = fr1();
  }

  // Set offset based on whether this is a UI action
  const offset = isUiAction ? 10 : 0;
  const colorMapping = {};

  // Iterate over each color profile in vr1
  for (const [profileKey, profileValue] of Object.entries(vr1)) {
    // Normalize the profile key: 'ansi16' becomes 'ansi', others remain unchanged
    const normalizedProfileKey = profileKey === 'ansi16' ? 'ansi' : profileKey;

    if (profileKey === colorKey) {
      // If the profile key matches the provided colorKey, process colorValue directly
      colorMapping[normalizedProfileKey] = colorProcessor(colorValue, offset);
    } else if (typeof profileValue === 'object') {
      // Otherwise, process the value from the profile for the given colorKey
      colorMapping[normalizedProfileKey] = colorProcessor(profileValue[colorKey], offset);
    }
  }

  return colorMapping;
}

module.exports = generateColorMapping;