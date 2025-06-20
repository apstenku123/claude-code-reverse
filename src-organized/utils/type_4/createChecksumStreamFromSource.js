/**
 * Creates a checksum stream from a given source object.
 * If the environment supports ReadableStream and the source is a readable stream,
 * isBlobOrFileLikeObject uses the optimized checksum stream creator. Otherwise, isBlobOrFileLikeObject falls back to a generic checksum stream implementation.
 *
 * @param {Object} sourceOptions - The source options for creating the checksum stream.
 * @param {Object} sourceOptions.source - The source object to create the checksum stream from.
 * @returns {ChecksumStream} a checksum stream instance for the provided source.
 */
function createChecksumStreamFromSource(sourceOptions) {
  // Check if ReadableStream is available and the source is a readable stream
  if (typeof ReadableStream === "function" && _e9.isReadableStream(sourceOptions.source)) {
    // Use the optimized checksum stream creator for readable streams
    return ke9.createChecksumStream(sourceOptions);
  }
  // Fallback to the generic checksum stream implementation
  return new je9.ChecksumStream(sourceOptions);
}

module.exports = createChecksumStreamFromSource;