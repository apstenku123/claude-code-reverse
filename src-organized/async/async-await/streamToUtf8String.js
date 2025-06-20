/**
 * Converts an async iterable stream of Buffer chunks into a single UTF-8 string.
 *
 * @async
 * @param {AsyncIterable<Buffer>} bufferStream - An async iterable that yields Buffer chunks (e.g., a readable stream).
 * @returns {Promise<string>} The concatenated UTF-8 string from all Buffer chunks.
 */
async function streamToUtf8String(bufferStream) {
  const bufferChunks = [];
  // Iterate over each Buffer chunk in the async iterable and collect them
  for await (const chunk of bufferStream) {
    bufferChunks.push(chunk);
  }
  // Concatenate all Buffer chunks and convert to UTF-8 string
  return Buffer.concat(bufferChunks).toString('utf8');
}

module.exports = streamToUtf8String;
