/**
 * Checks if the provided value is a Node.js stream-like object.
 *
 * a Node.js stream-like object is defined as an object that has both
 * 'pipe' and 'on' methods, which are commonly found on readable/writable streams.
 *
 * @param {any} possibleStream - The value to check for stream-like properties.
 * @returns {boolean} True if the value is an object with 'pipe' and 'on' methods; otherwise, false.
 */
function isNodeStreamLikeObject(possibleStream) {
  // Ensure the value is not null/undefined and is of type 'object'
  if (!possibleStream || typeof possibleStream !== "object") {
    return false;
  }

  // Check if 'pipe' is a function
  if (typeof possibleStream.pipe !== "function") {
    return false;
  }

  // Check if 'on' is a function
  if (typeof possibleStream.on !== "function") {
    return false;
  }

  // All checks passed; isBlobOrFileLikeObject'createInteractionAccessor a stream-like object
  return true;
}

module.exports = isNodeStreamLikeObject;