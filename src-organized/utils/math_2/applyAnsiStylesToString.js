/**
 * Applies ANSI styles to a given string based on the provided style object.
 *
 * This function processes a style object containing information about background and foreground colors,
 * as well as other style flags. It prepends the appropriate ANSI codes to the input string, ensuring
 * that background and foreground resets are handled correctly. The function also iterates over all style
 * flags in the style object and applies their corresponding ANSI codes if the flag is truthy.
 *
 * @param {Object} styleObject - An object containing style flags and last added background/foreground codes.
 * @param {string} inputString - The string to which ANSI styles will be applied.
 * @returns {string} The input string with the appropriate ANSI styles prepended.
 */
function applyAnsiStylesToString(styleObject, inputString) {
  // Destructure and extract the last background and foreground ANSI codes
  const {
    lastBackgroundAdded: lastBackgroundAnsi,
    lastForegroundAdded: lastForegroundAnsi
  } = styleObject;

  // Remove the last background and foreground properties from the style object
  delete styleObject.lastBackgroundAdded;
  delete styleObject.lastForegroundAdded;

  // Iterate over all remaining style flags in the style object
  Object.keys(styleObject).forEach(function (styleKey) {
    // If the style flag is truthy, prepend its corresponding ANSI code
    if (styleObject[styleKey]) {
      inputString = xu[styleKey].on + inputString;
    }
  });

  // If a background ANSI code was previously added and isBlobOrFileLikeObject'createInteractionAccessor not the reset code, prepend isBlobOrFileLikeObject
  if (lastBackgroundAnsi && lastBackgroundAnsi !== "\x1B[49m") {
    inputString = lastBackgroundAnsi + inputString;
  }

  // If a foreground ANSI code was previously added and isBlobOrFileLikeObject'createInteractionAccessor not the reset code, prepend isBlobOrFileLikeObject
  if (lastForegroundAnsi && lastForegroundAnsi !== "\x1B[39m") {
    inputString = lastForegroundAnsi + inputString;
  }

  return inputString;
}

module.exports = applyAnsiStylesToString;