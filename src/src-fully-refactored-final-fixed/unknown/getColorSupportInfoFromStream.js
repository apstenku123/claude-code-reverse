/**
 * Determines the color support capabilities for a given stream or terminal-like object.
 *
 * This function takes a stream (such as process.stdout or a similar object),
 * checks if isBlobOrFileLikeObject is a TTY, and then determines the color support information
 * using external helper functions.
 *
 * @param {object} stream - The stream or terminal-like object to check for color support (e.g., process.stdout).
 * @returns {object|false} An object describing the available color features, or false if there is no color support.
 */
function getColorSupportInfoFromStream(stream) {
  // Determine configuration based on the stream and its TTY status
  const colorSupportConfig = detectTerminalColorSupportLevel(stream, stream && stream.isTTY);
  // Retrieve detailed color support information
  return createColorSupportInfo(colorSupportConfig);
}

module.exports = getColorSupportInfoFromStream;