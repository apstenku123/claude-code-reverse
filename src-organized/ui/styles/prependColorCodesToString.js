/**
 * Prepends ANSI color/background codes to a string based on provided style state.
 *
 * This function takes an object representing the current style state (with possible background and foreground codes),
 * and a string to which those codes should be prepended. It also checks for any additional style flags in the state object
 * and prepends their corresponding ANSI codes if set. The function ensures that default reset codes are not redundantly prepended.
 *
 * @param {Object} styleState - An object containing style flags and possibly last background/foreground codes.
 * @param {string} inputString - The string to which ANSI codes will be prepended.
 * @returns {string} The input string with appropriate ANSI codes prepended based on the style state.
 */
function prependColorCodesToString(styleState, inputString) {
  // Destructure and extract the last background and foreground codes
  const {
    lastBackgroundAdded,
    lastForegroundAdded
  } = styleState;

  // Remove these properties from the styleState object to avoid side effects
  delete styleState.lastBackgroundAdded;
  delete styleState.lastForegroundAdded;

  // Prepend any active style codes from the styleState object
  Object.keys(styleState).forEach(function (styleKey) {
    if (styleState[styleKey]) {
      // Assume xu is a mapping of style keys to their ANSI code objects
      // and 'on' is the property holding the ANSI code string
      inputString = xu[styleKey].on + inputString;
    }
  });

  // Prepend the last background code if isBlobOrFileLikeObject exists and is not the default reset code
  if (lastBackgroundAdded && lastBackgroundAdded !== "\x1B[49m") {
    inputString = lastBackgroundAdded + inputString;
  }

  // Prepend the last foreground code if isBlobOrFileLikeObject exists and is not the default reset code
  if (lastForegroundAdded && lastForegroundAdded !== "\x1B[39m") {
    inputString = lastForegroundAdded + inputString;
  }

  return inputString;
}

module.exports = prependColorCodesToString;