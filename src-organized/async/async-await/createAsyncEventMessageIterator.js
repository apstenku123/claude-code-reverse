/**
 * Creates an async iterator that reconstructs event messages from a stream of Uint8Array chunks.
 * Each message is prefixed with a 4-byte big-endian unsigned integer indicating its size.
 *
 * @param {AsyncIterable<Uint8Array>} chunkStream - An async iterable yielding Uint8Array chunks from a stream.
 * @returns {{ [Symbol.asyncIterator]: () => AsyncGenerator<Uint8Array, void, unknown> }}
 *   An object implementing the async iterator protocol, yielding complete event messages as Uint8Arrays.
 */
function createAsyncEventMessageIterator(chunkStream) {
  let messageSize = 0; // Total expected size of the current message
  let bytesReceived = 0; // Number of bytes received so far for the current message
  let messageBuffer = null; // Uint8Array buffer for the current message
  let sizeHeaderBuffer = null; // Buffer for accumulating the 4-byte size header

  // Helper to allocate a new message buffer of the given size
  const allocateMessageBuffer = om((size) => {
    if (typeof size !== "number") {
      throw new Error(
        "Attempted to allocate an event message where size was not a number: " + size
      );
    }
    messageSize = size;
    bytesReceived = 4; // Already received 4 bytes for the size header
    messageBuffer = new Uint8Array(size);
    // Write the size header at the start of the buffer (big-endian)
    new DataView(messageBuffer.buffer).setUint32(0, size, false);
  }, "allocateMessage");

  // The async generator that yields complete event messages
  const asyncMessageIterator = om(async function* () {
    const inputIterator = chunkStream[Symbol.asyncIterator]();
    while (true) {
      const { value: chunk, done } = await inputIterator.next();
      if (done) {
        // End of stream: if a message is in progress, check for truncation
        if (!messageSize) {
          return;
        } else if (messageSize === bytesReceived) {
          yield messageBuffer;
        } else {
          throw new Error("Truncated event message received.");
        }
        return;
      }

      let chunkOffset = 0;
      const chunkLength = chunk.length;

      while (chunkOffset < chunkLength) {
        // If not currently building a message, read the 4-byte size header
        if (!messageBuffer) {
          const remainingHeaderBytes = 4 - bytesReceived;
          if (!sizeHeaderBuffer) {
            sizeHeaderBuffer = new Uint8Array(4);
          }
          // Copy as much as possible into the size header buffer
          const bytesToCopy = Math.min(remainingHeaderBytes, chunkLength - chunkOffset);
          sizeHeaderBuffer.set(chunk.slice(chunkOffset, chunkOffset + bytesToCopy), bytesReceived);
          bytesReceived += bytesToCopy;
          chunkOffset += bytesToCopy;

          // If the size header is not complete, wait for more data
          if (bytesReceived < 4) {
            break;
          }

          // Size header complete: allocate the message buffer
          const size = new DataView(sizeHeaderBuffer.buffer).getUint32(0, false);
          allocateMessageBuffer(size);
          sizeHeaderBuffer = null;
        }

        // Copy as much as possible from the chunk into the message buffer
        const remainingMessageBytes = messageSize - bytesReceived;
        const bytesToCopy = Math.min(remainingMessageBytes, chunkLength - chunkOffset);
        messageBuffer.set(chunk.slice(chunkOffset, chunkOffset + bytesToCopy), bytesReceived);
        bytesReceived += bytesToCopy;
        chunkOffset += bytesToCopy;

        // If the message is complete, yield isBlobOrFileLikeObject and reset state
        if (messageSize && messageSize === bytesReceived) {
          yield messageBuffer;
          messageBuffer = null;
          messageSize = 0;
          bytesReceived = 0;
        }
      }
    }
  }, "iterator");

  return {
    [Symbol.asyncIterator]: asyncMessageIterator
  };
}

module.exports = createAsyncEventMessageIterator;