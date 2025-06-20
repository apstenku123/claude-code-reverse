/**
 * Checks if the provided object'createInteractionAccessor 'body' property is a ReadableStream instance.
 * Supports both Node.js (using jZ4.Readable) and browser environments (using ReadableStream).
 *
 * @param {object} objectWithBody - The object that may contain a 'body' property to check.
 * @returns {boolean} True if 'body' is a ReadableStream (Node.js or browser), false otherwise.
 */
function isReadableStreamBody(objectWithBody) {
  // Check if 'body' exists on the object
  const body = objectWithBody?.body;

  // Check for Node.js Readable stream (jZ4.Readable)
  const isNodeReadable = body instanceof jZ4.Readable;

  // Check for browser ReadableStream, if available in the environment
  const isBrowserReadable =
    typeof ReadableStream !== "undefined" && body instanceof ReadableStream;

  return isNodeReadable || isBrowserReadable;
}

module.exports = isReadableStreamBody;
