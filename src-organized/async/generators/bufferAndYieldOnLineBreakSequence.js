/**
 * Buffers incoming chunks from an async iterable, yielding complete segments ending with a line break sequence.
 *
 * This function reads from an async iterable (such as a stream of Uint8Array, ArrayBuffer, or string chunks),
 * accumulates the data in a buffer, and yields slices of the buffer whenever a consecutive line break sequence
 * (as determined by findConsecutiveLineBreakSequenceEndIndex) is found. Any remaining data in the buffer after
 * the source is exhausted is yielded as the final chunk.
 *
 * @async
 * @generator
 * @param {AsyncIterable<Uint8Array | ArrayBuffer | string>} chunkIterable - An async iterable yielding data chunks to buffer and process.
 * @yields {Uint8Array} - Segments of the buffered data ending at line break sequences, or the remaining buffer at the end.
 */
async function* bufferAndYieldOnLineBreakSequence(chunkIterable) {
  // Buffer to accumulate incoming data
  let buffer = new Uint8Array();

  for await (const chunk of chunkIterable) {
    if (chunk == null) continue;

    // Normalize the chunk to a Uint8Array
    let normalizedChunk;
    if (chunk instanceof ArrayBuffer) {
      normalizedChunk = new Uint8Array(chunk);
    } else if (typeof chunk === "string") {
      normalizedChunk = Eo(chunk); // Assumes Eo converts string to Uint8Array
    } else {
      normalizedChunk = chunk;
    }

    // Concatenate the new chunk to the buffer
    const concatenatedBuffer = new Uint8Array(buffer.length + normalizedChunk.length);
    concatenatedBuffer.set(buffer);
    concatenatedBuffer.set(normalizedChunk, buffer.length);
    buffer = concatenatedBuffer;

    // Extract and yield complete segments ending with a line break sequence
    let lineBreakEndIndex;
    while ((lineBreakEndIndex = findConsecutiveLineBreakSequenceEndIndex(buffer)) !== -1) {
      yield buffer.slice(0, lineBreakEndIndex);
      buffer = buffer.slice(lineBreakEndIndex);
    }
  }

  // Yield any remaining data in the buffer
  if (buffer.length > 0) {
    yield buffer;
  }
}

module.exports = bufferAndYieldOnLineBreakSequence;