/**
 * Cleans up ANSI color state from the provided options object and appends necessary ANSI reset codes to the output string.
 *
 * This function removes 'lastBackgroundAdded' and 'lastForegroundAdded' properties from the options object,
 * appends any required 'off' ANSI codes from the xu mapping for truthy properties,
 * and ensures that background and foreground colors are reset if they were previously set.
 *
 * @param {Object} ansiState - An object containing ANSI color state and other properties.
 * @param {string} output - The string to which ANSI reset codes will be appended.
 * @returns {string} The updated output string with necessary ANSI reset codes appended.
 */
function resetAnsiColorsAndCleanup(ansiState, output) {
  // Destructure and extract the last background and foreground colors added
  const {
    lastBackgroundAdded,
    lastForegroundAdded
  } = ansiState;

  // Remove these properties from the original object to clean up state
  delete ansiState.lastBackgroundAdded;
  delete ansiState.lastForegroundAdded;

  // For each remaining property in ansiState, if isBlobOrFileLikeObject'createInteractionAccessor truthy, append its corresponding 'off' ANSI code
  Object.keys(ansiState).forEach(function (property) {
    if (ansiState[property]) {
      output += xu[property].off;
    }
  });

  // If a background color was set and isBlobOrFileLikeObject'createInteractionAccessor not already reset, append the ANSI reset code for background
  if (lastBackgroundAdded && lastBackgroundAdded !== "\x1B[49m") {
    output += "\x1B[49m";
  }

  // If a foreground color was set and isBlobOrFileLikeObject'createInteractionAccessor not already reset, append the ANSI reset code for foreground
  if (lastForegroundAdded && lastForegroundAdded !== "\x1B[39m") {
    output += "\x1B[39m";
  }

  return output;
}

module.exports = resetAnsiColorsAndCleanup;