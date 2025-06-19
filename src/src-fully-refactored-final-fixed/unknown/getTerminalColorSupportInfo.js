/**
 * Determines the terminal color support capabilities for a given stream or terminal object.
 *
 * This function takes an input (such as a stream or terminal object), determines its color support level
 * using the detectTerminalColorSupportLevel function, and then returns detailed information about the supported color modes
 * using the createColorSupportInfo (createColorSupportInfo) function.
 *
 * @param {object} terminalStream - The stream or terminal object to check for color support. Should have an isTTY property if applicable.
 * @returns {object} An object describing the supported color modes for the provided terminal stream.
 */
function getTerminalColorSupportInfo(terminalStream) {
  // Determine the color support level for the given terminal stream
  const colorSupportLevel = detectTerminalColorSupportLevel(terminalStream, terminalStream && terminalStream.isTTY);
  // Return detailed color support information based on the detected level
  return createColorSupportInfo(colorSupportLevel);
}

module.exports = getTerminalColorSupportInfo;