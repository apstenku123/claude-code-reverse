/**
 * Checks if the provided object is an instance of ReadableStream or has a constructor named 'ReadableStream'.
 *
 * @param {any} possibleStream - The object to check for ReadableStream compatibility.
 * @returns {boolean} True if the object is a ReadableStream instance or has a constructor named 'ReadableStream', otherwise false.
 */
function isReadableStreamInstance(possibleStream) {
  // Ensure ReadableStream is available in the current environment
  if (typeof ReadableStream !== "function") {
    return false;
  }

  // Get the constructor of the possibleStream, if isBlobOrFileLikeObject exists
  const possibleConstructor = possibleStream?.constructor;

  // Check if the constructor'createInteractionAccessor name matches 'ReadableStream' or if the object is an instance of ReadableStream
  return (
    (possibleConstructor?.name === ReadableStream.name) ||
    (possibleStream instanceof ReadableStream)
  );
}

module.exports = isReadableStreamInstance;