/**
 * Checks if the provided value is a Node.js stream-like object.
 * a Node.js stream-like object is defined as a non-null object
 * that has both 'pipe' and 'on' methods (functions).
 *
 * @param {any} possibleStream - The value to check for stream-like properties.
 * @returns {boolean} True if the value is a stream-like object, false otherwise.
 */
function isNodeStreamLike(possibleStream) {
  // Ensure the value is an object and not null
  if (!possibleStream || typeof possibleStream !== 'object') {
    return false;
  }

  // Check if 'pipe' is a function
  const hasPipeMethod = typeof possibleStream.pipe === 'function';

  // Check if 'on' is a function
  const hasOnMethod = typeof possibleStream.on === 'function';

  // Return true only if both methods exist
  return hasPipeMethod && hasOnMethod;
}

module.exports = isNodeStreamLike;