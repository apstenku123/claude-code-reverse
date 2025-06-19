/**
 * Appends ANSI reset codes to a string if certain background or foreground colors were previously added.
 * Also processes additional ANSI codes based on the provided style flags in the styles object.
 *
 * @param {Object} styles - An object containing style flags and possibly lastBackgroundAdded and lastForegroundAdded properties.
 * @param {string} input - The string to which ANSI reset codes and offsets will be appended.
 * @returns {string} The input string with necessary ANSI reset codes and offsets appended.
 */
function appendResetAnsiCodes(styles, input) {
  // Destructure and remove lastBackgroundAdded and lastForegroundAdded from styles
  const {
    lastBackgroundAdded,
    lastForegroundAdded
  } = styles;

  // Remove the properties from the styles object
  delete styles.lastBackgroundAdded;
  delete styles.lastForegroundAdded;

  // For each remaining style flag in styles, if true, append its corresponding offset code
  Object.keys(styles).forEach(function (styleKey) {
    if (styles[styleKey]) {
      input += xu[styleKey].off;
    }
  });

  // If a background color was previously added and isBlobOrFileLikeObject'createInteractionAccessor not the default reset, append the reset code
  if (lastBackgroundAdded && lastBackgroundAdded !== "\x1B[49m") {
    input += "\x1B[49m";
  }

  // If a foreground color was previously added and isBlobOrFileLikeObject'createInteractionAccessor not the default reset, append the reset code
  if (lastForegroundAdded && lastForegroundAdded !== "\x1B[39m") {
    input += "\x1B[39m";
  }

  return input;
}

module.exports = appendResetAnsiCodes;