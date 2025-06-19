/**
 * Buffers incoming data chunks from an async iterable, yielding complete segments ending with a line break sequence.
 *
 * This function accumulates data from the provided async iterable (such as a stream of Uint8Arrays, ArrayBuffers, or strings),
 * and yields Uint8Array slices each time a consecutive line break sequence (LF, CR, or CRLF) is detected.
 * Any remaining data after the source is exhausted is yielded as the final chunk.
 *
 * @async
 * @generator
 * @param {AsyncIterable<Uint8Array | ArrayBuffer | string>} sourceChunks - An async iterable of data chunks to buffer and split.
 * @yields {Uint8Array} - Buffered data up to and including each detected line break sequence.
 */
async function* bufferChunksUntilLineBreak(sourceChunks) {
  let bufferedData = new Uint8Array();
  for await (const chunk of sourceChunks) {
    if (chunk == null) continue;

    // Convert chunk to Uint8Array if necessary
    const normalizedChunk =
      chunk instanceof ArrayBuffer
        ? new Uint8Array(chunk)
        : typeof chunk === "string"
        ? Eo(chunk) // Eo: Converts string to Uint8Array
        : chunk;

    // Concatenate the new chunk to the buffered data
    const concatenated = new Uint8Array(bufferedData.length + normalizedChunk.length);
    concatenated.set(bufferedData);
    concatenated.set(normalizedChunk, bufferedData.length);
    bufferedData = concatenated;

    let lineBreakEndIndex;
    // findConsecutiveLineBreakSequenceEndIndex: Finds the end index after a consecutive line break sequence, or -1 if not found
    while ((lineBreakEndIndex = findConsecutiveLineBreakSequenceEndIndex(bufferedData)) !== -1) {
      // Yield up to and including the line break sequence
      yield bufferedData.slice(0, lineBreakEndIndex);
      // Remove the yielded part from the buffer
      bufferedData = bufferedData.slice(lineBreakEndIndex);
    }
  }
  // Yield any remaining data after the source is exhausted
  if (bufferedData.length > 0) {
    yield bufferedData;
  }
}

module.exports = bufferChunksUntilLineBreak;