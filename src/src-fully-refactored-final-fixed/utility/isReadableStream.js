/**
 * Determines if the provided object is a ReadableStream instance or has a constructor named 'ReadableStream'.
 *
 * @param {any} possibleStream - The object to check for ReadableStream compatibility.
 * @returns {boolean} True if the object is a ReadableStream or has a constructor named 'ReadableStream', false otherwise.
 */
function isReadableStream(possibleStream) {
  // Ensure ReadableStream is defined in the environment
  if (typeof ReadableStream !== "function") {
    return false;
  }

  // Get the constructor of the provided object, if isBlobOrFileLikeObject exists
  const objectConstructor = possibleStream?.constructor;

  // Check if the constructor'createInteractionAccessor name matches 'ReadableStream' or if the object is an instance of ReadableStream
  return (
    (objectConstructor?.name === ReadableStream.name) ||
    (possibleStream instanceof ReadableStream)
  );
}

module.exports = isReadableStream;