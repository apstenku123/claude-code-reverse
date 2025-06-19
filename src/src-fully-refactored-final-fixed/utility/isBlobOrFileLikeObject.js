/**
 * Checks if the provided object is a Blob or File-like object.
 *
 * This utility function verifies that the input object has the typical properties and methods
 * of a Blob or File, such as arrayBuffer, type, and stream, and that its Symbol.toStringTag
 * is either 'Blob' or 'File'. It also checks that the global Kj4 flag is enabled.
 *
 * @param {object} candidateObject - The object to test for Blob/File-like characteristics.
 * @returns {boolean} True if the object is a Blob or File-like object, false otherwise.
 */
function isBlobOrFileLikeObject(candidateObject) {
  // Ensure the global Kj4 flag is enabled before proceeding
  if (!Kj4) {
    return false;
  }

  // Check that candidateObject is a non-null object
  if (typeof candidateObject !== "object" || candidateObject === null) {
    return false;
  }

  // Verify required Blob/File methods and properties
  const hasArrayBufferMethod = typeof candidateObject.arrayBuffer === "function";
  const hasTypeString = typeof candidateObject.type === "string";
  const hasStreamMethod = typeof candidateObject.stream === "function";

  // Check the Symbol.toStringTag property for 'Blob' or 'File'
  const toStringTag = candidateObject[Symbol.toStringTag];
  const isBlobOrFileTag = toStringTag === "Blob" || toStringTag === "File";

  return hasArrayBufferMethod && hasTypeString && hasStreamMethod && isBlobOrFileTag;
}

module.exports = isBlobOrFileLikeObject;