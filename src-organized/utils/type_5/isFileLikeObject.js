/**
 * Determines if the provided object is a File-like object.
 *
 * This function checks if the input is either an instance of JJ6 (custom File class),
 * or if isBlobOrFileLikeObject has 'stream' or 'arrayBuffer' methods and its Symbol.toStringTag is 'File'.
 *
 * @param {any} possibleFile - The object to check for File-like characteristics.
 * @returns {boolean} True if the object is File-like, otherwise false.
 */
function isFileLikeObject(possibleFile) {
  // Check if the object is an instance of JJ6 (custom File class)
  if (possibleFile instanceof JJ6) {
    return true;
  }

  // Check if the object has 'stream' or 'arrayBuffer' methods and is tagged as 'File'
  const hasStreamMethod = typeof possibleFile?.stream === "function";
  const hasArrayBufferMethod = typeof possibleFile?.arrayBuffer === "function";
  const isTaggedAsFile = possibleFile?.[Symbol.toStringTag] === "File";

  return Boolean((hasStreamMethod || hasArrayBufferMethod) && isTaggedAsFile);
}

module.exports = isFileLikeObject;