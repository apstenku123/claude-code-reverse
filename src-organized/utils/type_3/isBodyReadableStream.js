/**
 * Checks if the provided object'createInteractionAccessor 'body' property is a readable stream.
 * Supports both Node.js (using jZ4.Readable) and browser (using ReadableStream) environments.
 *
 * @param {object} sourceObject - The object to check for a readable stream in its 'body' property.
 * @returns {boolean} True if 'body' is a readable stream, false otherwise.
 */
function isBodyReadableStream(sourceObject) {
  // Check if sourceObject is not null/undefined and has a 'body' property
  const body = sourceObject?.body;

  // Check for Node.js readable stream (jZ4.Readable)
  const isNodeReadable = body instanceof jZ4.Readable;

  // Check for browser ReadableStream, if available in the environment
  const isBrowserReadable =
    typeof ReadableStream !== "undefined" && body instanceof ReadableStream;

  return isNodeReadable || isBrowserReadable;
}

module.exports = isBodyReadableStream;
