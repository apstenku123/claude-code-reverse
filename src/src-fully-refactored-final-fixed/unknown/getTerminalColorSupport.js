/**
 * Determines the terminal'createInteractionAccessor color support capabilities.
 *
 * This function takes a stream (such as process.stdout) and determines its color support
 * by first generating a configuration object (using detectTerminalColorSupportLevel) and then passing that configuration
 * to createColorSupportInfo (createColorSupportInfo) to get detailed color support information.
 *
 * @param {object} stream - The stream object (e.g., process.stdout) to check for color support.
 * @returns {object} An object describing the terminal'createInteractionAccessor color support capabilities.
 */
function getTerminalColorSupport(stream) {
  // Generate a configuration object for color support detection
  // detectTerminalColorSupportLevel expects the stream and its isTTY property
  const colorSupportConfig = detectTerminalColorSupportLevel(stream, stream && stream.isTTY);

  // Determine and return the terminal'createInteractionAccessor color support info
  return createColorSupportInfo(colorSupportConfig);
}

module.exports = getTerminalColorSupport;