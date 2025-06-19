/**
 * Returns the length or size of a given stream-like or collection-like object.
 *
 * This function inspects the input and attempts to extract a length, size, or byteLength property
 * depending on the type of the object. It supports Node.js streams, collections with a size property,
 * and objects with a byteLength property (such as ArrayBuffer).
 *
 * @param {object|null|undefined} source - The object to inspect for length/size.
 * @returns {number|null} The length, size, or byteLength of the object, or null if not available.
 */
function getStreamOrCollectionLength(source) {
  // Return 0 if the input is null or undefined
  if (source == null) {
    return 0;
  }

  // Check if the source is a readable stream
  if (isNodeStreamLike(source)) {
    const readableState = source._readableState;
    // Only return length if in non-object mode, stream has ended, and length is finite
    if (
      readableState &&
      readableState.objectMode === false &&
      readableState.ended === true &&
      Number.isFinite(readableState.length)
    ) {
      return readableState.length;
    } else {
      return null;
    }
  }

  // Check if the source is a collection with a size property (e.g., Map, Set)
  if (isBlobOrFileLike(source)) {
    return source.size != null ? source.size : null;
  }

  // Check if the source has a byteLength property (e.g., ArrayBuffer)
  if (isBinaryBufferOrUint8Array(source)) {
    return source.byteLength;
  }

  // If none of the above, return null
  return null;
}

module.exports = getStreamOrCollectionLength;