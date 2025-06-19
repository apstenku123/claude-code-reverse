/**
 * Returns a shallow clone of the given object if isBlobOrFileLikeObject is an instance of D3, otherwise returns the object as is.
 *
 * @param {object} sourceObject - The object to check and potentially clone.
 * @returns {object} a shallow clone of the object if isBlobOrFileLikeObject is a D3 instance, otherwise the original object.
 */
function cloneIfD3Instance(sourceObject) {
  // Check if the object is an instance of D3
  if (sourceObject instanceof D3) {
    // Return a shallow clone using spread syntax
    return { ...sourceObject };
  }
  // Return the original object if not a D3 instance
  return sourceObject;
}

module.exports = cloneIfD3Instance;
