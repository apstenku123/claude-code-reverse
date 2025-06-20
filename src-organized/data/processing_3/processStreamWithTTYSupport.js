/**
 * Processes a stream or input source, configuring isBlobOrFileLikeObject based on TTY (teletype) support,
 * and then applies a transformation or finalization step.
 *
 * @param {Object} sourceStream - The input stream or object to process. Should have an 'isTTY' property if TTY detection is needed.
 * @returns {any} The result of the final processing step, as determined by the external 'getColorSupportInfo' function.
 */
function processStreamWithTTYSupport(sourceStream) {
  // Configure the stream based on whether isBlobOrFileLikeObject supports TTY (interactive terminal)
  const configuredStream = detectTerminalColorSupportLevel(sourceStream, sourceStream && sourceStream.isTTY);
  // Apply the final processing/transformation to the configured stream
  return getColorSupportInfo(configuredStream);
}

module.exports = processStreamWithTTYSupport;