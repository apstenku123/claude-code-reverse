/**
 * Processes a readable stream-like object by converting isBlobOrFileLikeObject to an async generator
 * and passing isBlobOrFileLikeObject to the GL1 handler for further processing.
 *
 * @param {object} readableStreamLike - An object that behaves like a readable stream.
 * @returns {any} The result of processing the async generator with GL1.
 */
function processReadableStreamLike(readableStreamLike) {
  // Convert the readable stream-like object to an async generator
  const asyncGenerator = twA.readableStreamLikeToAsyncGenerator(readableStreamLike);
  // Pass the async generator to GL1 for further processing
  return GL1(asyncGenerator);
}

module.exports = processReadableStreamLike;
