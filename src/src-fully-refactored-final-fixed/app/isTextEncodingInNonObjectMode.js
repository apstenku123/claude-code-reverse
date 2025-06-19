/**
 * Determines if a stream-like configuration uses a text encoding (not 'buffer') and is not in object mode.
 *
 * @param {Object} streamConfig - The configuration object for the stream.
 * @param {boolean} [streamConfig.objectMode] - Indicates if the stream operates in object mode.
 * @param {string} [streamConfig.encoding] - The encoding used by the stream (e.g., 'utf8', 'buffer').
 * @returns {boolean} Returns true if the stream is NOT in object mode, has a defined encoding, and the encoding is not 'buffer'.
 */
const isTextEncodingInNonObjectMode = (streamConfig) => {
  // Check that the stream is not in object mode
  // and that encoding is set and not 'buffer'
  return (
    !streamConfig.objectMode &&
    Boolean(streamConfig.encoding) &&
    streamConfig.encoding !== 'buffer'
  );
};

module.exports = isTextEncodingInNonObjectMode;
