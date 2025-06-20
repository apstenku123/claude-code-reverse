/**
 * Concatenates all Buffer chunks from an async iterable into a single Buffer.
 *
 * @async
 * @function concatenateAsyncBuffers
 * @param {AsyncIterable<Buffer>} bufferChunksIterable - An async iterable that yields Buffer objects.
 * @returns {Promise<Buffer>} a promise that resolves to a single Buffer containing all concatenated chunks.
 */
async function concatenateAsyncBuffers(bufferChunksIterable) {
  let totalLength = 0;
  const bufferChunks = [];

  // Iterate over each Buffer chunk in the async iterable
  for await (const bufferChunk of bufferChunksIterable) {
    totalLength += bufferChunk.length; // Accumulate the total length
    bufferChunks.push(bufferChunk);    // Collect each Buffer chunk
  }

  // Concatenate all Buffer chunks into a single Buffer
  return Buffer.concat(bufferChunks, totalLength);
}

module.exports = concatenateAsyncBuffers;