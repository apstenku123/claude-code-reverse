/**
 * Splits an async iterable stream of ArrayBuffer, Uint8Array, or string chunks into Uint8Array segments
 * at each detected consecutive line break sequence (LF, CR, or CRLF pairs).
 * Chunks may be strings, ArrayBuffers, or Uint8Arrays. Strings are encoded as UTF-8.
 * Any remaining data after the last line break is yielded as a final chunk.
 *
 * @async
 * @generator
 * @param {AsyncIterable<ArrayBuffer | Uint8Array | string>} chunkStream - The async iterable source of data chunks.
 * @yields {Uint8Array} - Segments of the stream split at line break sequences.
 */
async function* streamSplitByLineBreaks(chunkStream) {
  // Buffer to accumulate incoming data between yields
  let buffer = new Uint8Array();

  for await (const chunk of chunkStream) {
    if (chunk == null) continue; // Skip null/undefined chunks

    // Normalize chunk to Uint8Array
    let chunkBytes;
    if (chunk instanceof ArrayBuffer) {
      chunkBytes = new Uint8Array(chunk);
    } else if (typeof chunk === "string") {
      chunkBytes = encodeStringToUtf8(chunk); // External dependency
    } else {
      chunkBytes = chunk; // Assume Uint8Array
    }

    // Concatenate buffer and new chunk
    const combined = new Uint8Array(buffer.length + chunkBytes.length);
    combined.set(buffer);
    combined.set(chunkBytes, buffer.length);
    buffer = combined;

    let lineBreakEndIndex;
    // Find and yield each segment ending with a line break sequence
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

module.exports = streamSplitByLineBreaks;