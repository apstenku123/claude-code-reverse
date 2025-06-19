/**
 * Buffers incoming data chunks from an async iterable and yields complete segments ending with a line break sequence.
 * Handles input as ArrayBuffer, string, or Uint8Array, and encodes/concatenates as needed.
 *
 * @async
 * @generator
 * @param {AsyncIterable<ArrayBuffer|string|Uint8Array|null|undefined>} inputAsyncIterable - An async iterable yielding data chunks to be buffered and segmented.
 * @yields {Uint8Array} - Segments of data ending with a line break sequence, or any remaining data at the end.
 */
async function* bufferUntilLineBreakSequence(inputAsyncIterable) {
  // Holds any leftover data that hasn'processRuleBeginHandlers been yielded yet
  let buffer = new Uint8Array();

  for await (const chunk of inputAsyncIterable) {
    if (chunk == null) continue; // Skip null/undefined chunks

    // Normalize chunk to Uint8Array
    let chunkAsUint8Array;
    if (chunk instanceof ArrayBuffer) {
      chunkAsUint8Array = new Uint8Array(chunk);
    } else if (typeof chunk === "string") {
      chunkAsUint8Array = encodeStringToUtf8(chunk); // External dependency
    } else {
      chunkAsUint8Array = chunk; // Assume already Uint8Array
    }

    // Concatenate buffer and new chunk
    const concatenated = new Uint8Array(buffer.length + chunkAsUint8Array.length);
    concatenated.set(buffer);
    concatenated.set(chunkAsUint8Array, buffer.length);
    buffer = concatenated;

    let lineBreakEndIndex;
    // Find and yield all complete segments ending with a line break sequence
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

// External dependencies (assumed to be imported elsewhere):
// - encodeStringToUtf8: Encodes a string into a UTF-8 Uint8Array
// - findConsecutiveLineBreakSequenceEndIndex: Finds the end index of a line break sequence in a Uint8Array

module.exports = bufferUntilLineBreakSequence;