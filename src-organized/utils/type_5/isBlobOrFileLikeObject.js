/**
 * Determines if the provided object is a Blob or File-like object.
 *
 * This function checks if the input object has the typical properties and methods
 * associated with Blob or File instances, such as arrayBuffer, type, stream, and
 * appropriate constructor and toStringTag values.
 *
 * @param {object} candidateObject - The object to check for Blob/File-like characteristics.
 * @returns {boolean} True if the object is a Blob or File-like object, false otherwise.
 */
function isBlobOrFileLikeObject(candidateObject) {
  // Ensure the input is an object
  if (typeof candidateObject !== "object" || candidateObject === null) {
    return false;
  }

  // Check for required Blob/File methods and properties
  const hasArrayBufferMethod = typeof candidateObject.arrayBuffer === "function";
  const hasTypeString = typeof candidateObject.type === "string";
  const hasStreamMethod = typeof candidateObject.stream === "function";

  // Check for a valid constructor and its name
  const hasValidConstructor = typeof candidateObject.constructor === "function" &&
    typeof candidateObject.constructor.name === "string" &&
    /^(Blob|File)$/.test(candidateObject.constructor.name);

  // Check the Symbol.toStringTag property for Blob/File
  const hasValidToStringTag = typeof candidateObject[Symbol.toStringTag] === "string" &&
    /^(Blob|File)$/.test(candidateObject[Symbol.toStringTag]);

  // Return true only if all checks pass
  return hasArrayBufferMethod &&
    hasTypeString &&
    hasStreamMethod &&
    hasValidConstructor &&
    hasValidToStringTag;
}

module.exports = isBlobOrFileLikeObject;