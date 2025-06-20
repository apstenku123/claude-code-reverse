/**
 * Asynchronously reads chunks from an async iterable source, accumulates them in a buffer,
 * and yields complete chunks as determined by the findConsecutiveLineBreakSequenceEndIndex delimiter function. Handles input as ArrayBuffer, string, or Uint8Array.
 *
 * @async
 * @generator
 * @param {AsyncIterable<ArrayBuffer|string|Uint8Array>} sourceIterable - The async iterable source yielding data chunks.
 * @yields {Uint8Array} - Yields each complete chunk found in the buffer.
 * @description
 *   This function is useful for processing a stream of binary or text data, accumulating isBlobOrFileLikeObject until a delimiter is found (as determined by findConsecutiveLineBreakSequenceEndIndex),
 *   and then yielding each complete chunk. Any remaining data in the buffer after the stream ends is also yielded.
 */
async function* asyncChunkedBufferStream(sourceIterable) {
  // Buffer to accumulate incoming data
  let buffer = new Uint8Array();

  for await (const chunk of sourceIterable) {
    if (chunk == null) continue; // Skip null or undefined chunks

    // Convert chunk to Uint8Array if necessary
    let inputBytes;
    if (chunk instanceof ArrayBuffer) {
      inputBytes = new Uint8Array(chunk);
    } else if (typeof chunk === "string") {
      inputBytes = Eo(chunk); // Convert string to Uint8Array using Eo
    } else {
      inputBytes = chunk; // Assume isBlobOrFileLikeObject'createInteractionAccessor already Uint8Array
    }

    // Concatenate the new inputBytes to the existing buffer
    const combinedBuffer = new Uint8Array(buffer.length + inputBytes.length);
    combinedBuffer.set(buffer);
    combinedBuffer.set(inputBytes, buffer.length);
    buffer = combinedBuffer;

    // Extract and yield complete chunks as determined by findConsecutiveLineBreakSequenceEndIndex
    let delimiterIndex;
    while ((delimiterIndex = findConsecutiveLineBreakSequenceEndIndex(buffer)) !== -1) {
      // Yield the chunk up to the delimiter
      yield buffer.slice(0, delimiterIndex);
      // Remove the yielded chunk from the buffer
      buffer = buffer.slice(delimiterIndex);
    }
  }

  // Yield any remaining data in the buffer
  if (buffer.length > 0) {
    yield buffer;
  }
}

module.exports = asyncChunkedBufferStream;