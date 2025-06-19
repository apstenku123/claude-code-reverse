/**
 * Appends ANSI reset codes to a string based on the provided style state object.
 *
 * This function processes a style state object, removes its 'lastBackgroundAdded' and 'lastForegroundAdded' properties,
 * and appends the corresponding ANSI reset codes to the given string if necessary. It also appends any 'off' codes
 * from the 'xu' mapping for truthy properties in the style state.
 *
 * @param {Object} styleState - An object representing the current ANSI style state. May contain 'lastBackgroundAdded', 'lastForegroundAdded', and other style flags.
 * @param {string} inputString - The string to which ANSI reset codes will be appended.
 * @returns {string} The input string with appropriate ANSI reset codes appended.
 */
function appendAnsiResetCodes(styleState, inputString) {
  // Extract and remove the last background and foreground properties
  const {
    lastBackgroundAdded,
    lastForegroundAdded
  } = styleState;

  // Remove these properties from the styleState object
  delete styleState.lastBackgroundAdded;
  delete styleState.lastForegroundAdded;

  // For each remaining truthy property in styleState, append its 'off' code from the xu mapping
  Object.keys(styleState).forEach(function (styleKey) {
    if (styleState[styleKey]) {
      inputString += xu[styleKey].off;
    }
  });

  // If a background was previously added and is not already reset, append the background reset code
  if (lastBackgroundAdded && lastBackgroundAdded !== "\x1B[49m") {
    inputString += "\x1B[49m";
  }

  // If a foreground was previously added and is not already reset, append the foreground reset code
  if (lastForegroundAdded && lastForegroundAdded !== "\x1B[39m") {
    inputString += "\x1B[39m";
  }

  return inputString;
}

module.exports = appendAnsiResetCodes;