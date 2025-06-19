/**
 * Resets ANSI background and foreground colors if needed, and appends offset codes for active styles.
 *
 * This function processes a styles object, removes tracking properties for the last added background and foreground colors,
 * appends corresponding offset codes for each active style, and ensures that ANSI color resets are appended if necessary.
 *
 * @param {Object} styles - An object representing active ANSI styles. May include 'lastBackgroundAdded' and 'lastForegroundAdded' properties.
 * @param {string} ansiString - The current ANSI string to which offset codes will be appended.
 * @returns {string} The ANSI string with necessary offset codes and color resets appended.
 */
function resetAnsiColorsAndAppendOffsets(styles, ansiString) {
  // Destructure and remove tracking of last added background/foreground colors
  const {
    lastBackgroundAdded,
    lastForegroundAdded
  } = styles;

  // Remove the tracking properties from the styles object
  delete styles.lastBackgroundAdded;
  delete styles.lastForegroundAdded;

  // For each active style, append its offset code to the ANSI string
  Object.keys(styles).forEach(function (styleKey) {
    if (styles[styleKey]) {
      ansiString += xu[styleKey].off; // 'xu' is assumed to be an external mapping of style keys to their ANSI codes
    }
  });

  // If a background color was previously added and isBlobOrFileLikeObject'createInteractionAccessor not the default reset, append the reset code
  if (lastBackgroundAdded && lastBackgroundAdded !== "\x1B[49m") {
    ansiString += "\x1B[49m";
  }

  // If a foreground color was previously added and isBlobOrFileLikeObject'createInteractionAccessor not the default reset, append the reset code
  if (lastForegroundAdded && lastForegroundAdded !== "\x1B[39m") {
    ansiString += "\x1B[39m";
  }

  return ansiString;
}

module.exports = resetAnsiColorsAndAppendOffsets;