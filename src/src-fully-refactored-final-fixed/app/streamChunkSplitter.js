/**
 * Asynchronously iterates over a source of data chunks, accumulating them into a buffer,
 * and yields slices of the buffer whenever a delimiter is found (as determined by the delimiterFinder function).
 * Handles ArrayBuffer, string, and Uint8Array chunk types.
 *
 * @async
 * @generator
 * @function streamChunkSplitter
 * @param {AsyncIterable<ArrayBuffer|string|Uint8Array>} chunkSource - An async iterable source of data chunks to process.
 * @yields {Uint8Array} - Yields Uint8Array slices of the buffer up to each delimiter found.
 * @description
 *   This function is useful for processing a stream of binary or text data, splitting isBlobOrFileLikeObject into logical chunks
 *   (such as lines or records) based on a delimiter. It supports chunk types of ArrayBuffer, string, or Uint8Array.
 *   The function uses a provided delimiterFinder (findConsecutiveLineBreakSequenceEndIndex) to locate delimiter positions in the buffer, and a string-to-Uint8Array
 *   encoder (Eo) to handle string chunks.
 */
async function* streamChunkSplitter(chunkSource) {
  let buffer = new Uint8Array(); // Accumulated buffer of all received data
  for await (const chunk of chunkSource) {
    if (chunk == null) continue; // Skip null or undefined chunks

    // Convert chunk to Uint8Array if necessary
    let chunkUint8;
    if (chunk instanceof ArrayBuffer) {
      chunkUint8 = new Uint8Array(chunk);
    } else if (typeof chunk === "string") {
      chunkUint8 = Eo(chunk); // Eo: function to encode string to Uint8Array
    } else {
      chunkUint8 = chunk; // Assume isBlobOrFileLikeObject'createInteractionAccessor already a Uint8Array
    }

    // Concatenate the new chunk to the buffer
    const newBuffer = new Uint8Array(buffer.length + chunkUint8.length);
    newBuffer.set(buffer);
    newBuffer.set(chunkUint8, buffer.length);
    buffer = newBuffer;

    // Attempt to find and yield complete chunks based on the delimiter
    let delimiterIndex;
    while ((delimiterIndex = findConsecutiveLineBreakSequenceEndIndex(buffer)) !== -1) { // findConsecutiveLineBreakSequenceEndIndex: function to find delimiter index in buffer
      yield buffer.slice(0, delimiterIndex); // Yield up to the delimiter
      buffer = buffer.slice(delimiterIndex); // Remove yielded chunk from buffer
    }
  }
  // Yield any remaining data in the buffer
  if (buffer.length > 0) {
    yield buffer;
  }
}

module.exports = streamChunkSplitter;