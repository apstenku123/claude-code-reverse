/**
 * Reads all chunks from an async iterable (such as a stream),
 * concatenates them into a single Buffer, and returns the result as a UTF-8 string.
 *
 * @async
 * @function readStreamToUtf8String
 * @param {AsyncIterable<Buffer>} asyncIterable - An async iterable yielding Buffer chunks (e.g., a readable stream).
 * @returns {Promise<string>} The concatenated contents of the stream as a UTF-8 string.
 */
async function readStreamToUtf8String(asyncIterable) {
  const bufferChunks = [];
  // Iterate over each chunk from the async iterable and collect them
  for await (const chunk of asyncIterable) {
    bufferChunks.push(chunk);
  }
  // Concatenate all Buffer chunks and convert to UTF-8 string
  return Buffer.concat(bufferChunks).toString('utf8');
}

module.exports = readStreamToUtf8String;
