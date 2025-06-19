/**
 * Converts a readable stream-like object to an async generator and schedules its iteration using the provided scheduler configuration.
 *
 * @param {ReadableStream|Object} readableStreamLike - The readable stream-like object to be converted into an async generator.
 * @param {Object} schedulerConfig - The configuration or scheduler to use for scheduling the async iterable.
 * @returns {Promise<any>} The result of scheduling the async iterable, as determined by the scheduler implementation.
 */
function scheduleReadableStreamAsyncIterable(readableStreamLike, schedulerConfig) {
  // Convert the readable stream-like object to an async generator
  const asyncGenerator = bM9.readableStreamLikeToAsyncGenerator(readableStreamLike);

  // Schedule the async generator using the provided scheduler configuration
  return vM9.scheduleAsyncIterable(asyncGenerator, schedulerConfig);
}

module.exports = scheduleReadableStreamAsyncIterable;