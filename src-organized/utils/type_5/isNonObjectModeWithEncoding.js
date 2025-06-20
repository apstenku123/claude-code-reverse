/**
 * Determines if the given stream configuration is not in object mode and has a non-buffer encoding.
 *
 * @param {Object} streamConfig - The stream configuration object to check.
 * @param {boolean} streamConfig.objectMode - Indicates if the stream operates in object mode.
 * @param {string} [streamConfig.encoding] - The encoding type of the stream (e.g., 'utf8', 'buffer').
 * @returns {boolean} True if the stream is not in object mode, has an encoding defined, and the encoding is not 'buffer'.
 */
const isNonObjectModeWithEncoding = (streamConfig) => {
  // Check that the stream is NOT in object mode
  // AND has a defined encoding
  // AND the encoding is not 'buffer'
  return (
    !streamConfig.objectMode &&
    Boolean(streamConfig.encoding) &&
    streamConfig.encoding !== "buffer"
  );
};

module.exports = isNonObjectModeWithEncoding;
