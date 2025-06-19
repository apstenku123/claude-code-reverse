/**
 * Checks if the provided object is a Blob or File-like object.
 *
 * This utility function verifies that the input is an object with the following properties:
 *   - Has an arrayBuffer() method
 *   - Has a type property of type string
 *   - Has a stream() method
 *   - Has a Symbol.toStringTag property equal to 'Blob' or 'File'
 *   - The global flag 'Kj4' must be truthy for the check to pass
 *
 * @param {object} candidateObject - The object to check for Blob/File-like characteristics.
 * @returns {boolean} True if the object is Blob or File-like, false otherwise.
 */
function isBlobLikeObject(candidateObject) {
  // Ensure the global flag is set and the candidate is an object
  if (!Kj4 || typeof candidateObject !== "object" || candidateObject === null) {
    return false;
  }

  // Check for required Blob/File-like methods and properties
  const hasArrayBufferMethod = typeof candidateObject.arrayBuffer === "function";
  const hasTypeString = typeof candidateObject.type === "string";
  const hasStreamMethod = typeof candidateObject.stream === "function";
  const toStringTag = candidateObject[Symbol.toStringTag];
  const isBlobOrFile = toStringTag === "Blob" || toStringTag === "File";

  return hasArrayBufferMethod && hasTypeString && hasStreamMethod && isBlobOrFile;
}

module.exports = isBlobLikeObject;