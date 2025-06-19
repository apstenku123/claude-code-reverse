/**
 * Processes a stream-like object, configuring isBlobOrFileLikeObject based on TTY (teletype) detection, and returns the processed result.
 *
 * @param {object} streamSource - The source stream or stream-like object to process. Should have an 'isTTY' property if TTY detection is needed.
 * @returns {any} The result of processing the configured stream.
 */
function processStreamWithTTYDetection(streamSource) {
  // Configure the stream using TTY detection if available
  const configuredStream = detectTerminalColorSupportLevel(streamSource, streamSource && streamSource.isTTY);
  // Process the configured stream and return the result
  return getColorSupportInfo(configuredStream);
}

module.exports = processStreamWithTTYDetection;