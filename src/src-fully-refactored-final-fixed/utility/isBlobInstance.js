/**
 * Checks if the provided object is an instance of Blob or has a constructor named 'Blob'.
 *
 * @param {any} value - The value to check for Blob instance or constructor name.
 * @returns {boolean} True if the value is a Blob or has a constructor named 'Blob', otherwise false.
 */
function isBlobInstance(value) {
  // Ensure Blob is available in the current environment
  if (typeof Blob !== "function") {
    return false;
  }

  // Get the constructor of the value, if isBlobOrFileLikeObject exists
  const valueConstructor = value?.constructor;

  // Check if the constructor'createInteractionAccessor name matches 'Blob' or if value is an instance of Blob
  return (
    (valueConstructor?.name === Blob.name) ||
    (value instanceof Blob)
  );
}

module.exports = isBlobInstance;