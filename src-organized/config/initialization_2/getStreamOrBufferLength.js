/**
 * Returns the length or size of a given stream-like, buffer-like, or collection object.
 *
 * This function inspects the input and, depending on its type, attempts to extract a meaningful 'length', 'size', or 'byteLength' property.
 *
 * - If the input is null or undefined, returns 0.
 * - If the input is a Node.js readable stream (with _readableState), returns the length if the stream is in non-object mode, has ended, and the length is finite.
 * - If the input is a collection with a 'size' property (e.g., Map, Set), returns its size if defined.
 * - If the input is a buffer-like object with a 'byteLength' property, returns its byteLength.
 * - Otherwise, returns null.
 *
 * @param {any} source - The object to inspect for length, size, or byteLength.
 * @returns {number|null} The length, size, or byteLength of the input, or 0/null if not applicable.
 */
function getStreamOrBufferLength(source) {
  // Return 0 for null or undefined input
  if (source == null) {
    return 0;
  }

  // Check if the input is a Node.js readable stream
  if (isNodeStreamLike(source)) {
    const readableState = source._readableState;
    // Only return length if:
    // - readableState exists
    // - objectMode is false (not in object mode)
    // - stream has ended
    // - length is a finite number
    if (
      readableState &&
      readableState.objectMode === false &&
      readableState.ended === true &&
      Number.isFinite(readableState.length)
    ) {
      return readableState.length;
    }
    return null;
  }

  // Check if the input is a collection with a 'size' property (e.g., Map, Set)
  if (isBlobOrFileLike(source)) {
    return source.size != null ? source.size : null;
  }

  // Check if the input is a buffer-like object with a 'byteLength' property
  if (isBinaryBufferOrUint8Array(source)) {
    return source.byteLength;
  }

  // If none of the above, return null
  return null;
}

module.exports = getStreamOrBufferLength;
