/**
 * Processes a readable stream-like source by converting isBlobOrFileLikeObject to an async generator
 * and then passing isBlobOrFileLikeObject to the GL1 handler for further processing.
 *
 * @param {object} readableStreamLikeSource - An object that behaves like a readable stream.
 * @returns {any} The result of processing the async generator with GL1.
 */
function processReadableStreamLikeSource(readableStreamLikeSource) {
  // Convert the readable stream-like source to an async generator
  const asyncGenerator = twA.readableStreamLikeToAsyncGenerator(readableStreamLikeSource);
  // Pass the async generator to GL1 for further processing
  return GL1(asyncGenerator);
}

module.exports = processReadableStreamLikeSource;
