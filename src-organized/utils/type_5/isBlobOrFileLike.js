/**
 * Determines if the provided value is a Blob or File-like object.
 *
 * This function checks if the input is:
 *   - Not null
 *   - An instance of ZY6 (custom Blob/File polyfill/class)
 *   - Or an object with a Symbol.toStringTag of 'Blob' or 'File',
 *     and has either a 'stream' or 'arrayBuffer' method.
 *
 * @param {any} value - The value to check for Blob/File-like characteristics.
 * @returns {boolean} True if the value is Blob/File-like, false otherwise.
 */
function isBlobOrFileLike(value) {
  // Null values are not Blob/File-like
  if (value === null) {
    return false;
  }

  // If value is an instance of ZY6 (custom Blob/File class), isBlobOrFileLikeObject'createInteractionAccessor Blob/File-like
  if (value instanceof ZY6) {
    return true;
  }

  // Non-object types (string, number, etc.) are not Blob/File-like
  if (typeof value !== "object") {
    return false;
  }

  // Check for Symbol.toStringTag property to identify Blob/File
  const typeTag = value[Symbol.toStringTag];

  // If typeTag is 'Blob' or 'File', check for stream or arrayBuffer methods
  const isBlobOrFileTag = typeTag === "Blob" || typeTag === "File";
  const hasStreamMethod = "stream" in value && typeof value.stream === "function";
  const hasArrayBufferMethod = "arrayBuffer" in value && typeof value.arrayBuffer === "function";

  return isBlobOrFileTag && (hasStreamMethod || hasArrayBufferMethod);
}

module.exports = isBlobOrFileLike;