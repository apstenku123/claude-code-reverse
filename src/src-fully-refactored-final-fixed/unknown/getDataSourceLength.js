/**
 * Returns the length, size, or byteLength of a given data source, depending on its type.
 *
 * Handles Node.js streams, collections with a size property, and objects with a byteLength property.
 * If the input is null or undefined, returns 0. If the length/size/byteLength cannot be determined, returns null.
 *
 * @param {object|null|undefined} dataSource - The data source to inspect. Can be a stream, collection, buffer, or similar object.
 * @returns {number|null} The length, size, or byteLength of the data source, or null if not determinable. Returns 0 if input is null or undefined.
 */
function getDataSourceLength(dataSource) {
  // Return 0 if input is null or undefined
  if (dataSource == null) {
    return 0;
  }

  // Check if dataSource is a readable stream
  if (isNodeStreamLike(dataSource)) {
    const readableState = dataSource._readableState;
    // Only return length if stream is not in object mode, has ended, and length is a finite number
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

  // Check if dataSource is a collection with a size property
  if (isBlobOrFileLike(dataSource)) {
    return dataSource.size != null ? dataSource.size : null;
  }

  // Check if dataSource has a byteLength property (e.g., Buffer, ArrayBuffer)
  if (isBinaryBufferOrUint8Array(dataSource)) {
    return dataSource.byteLength;
  }

  // If none of the above, return null
  return null;
}

module.exports = getDataSourceLength;