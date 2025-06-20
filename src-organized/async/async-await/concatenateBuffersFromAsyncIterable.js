/**
 * Concatenates all Buffer chunks from an asynchronous iterable into a single Buffer.
 *
 * @async
 * @function concatenateBuffersFromAsyncIterable
 * @param {AsyncIterable<Buffer>} bufferIterable - An asynchronous iterable that yields Buffer objects.
 * @returns {Promise<Buffer>} a promise that resolves to a single Buffer containing the concatenated data from all chunks.
 */
async function concatenateBuffersFromAsyncIterable(bufferIterable) {
  let totalLength = 0;
  const bufferChunks = [];

  // Iterate over each Buffer chunk in the async iterable
  for await (const chunk of bufferIterable) {
    totalLength += chunk.length; // Accumulate total length
    bufferChunks.push(chunk);    // Collect each chunk
  }

  // Concatenate all collected Buffer chunks into a single Buffer
  return Buffer.concat(bufferChunks, totalLength);
}

module.exports = concatenateBuffersFromAsyncIterable;