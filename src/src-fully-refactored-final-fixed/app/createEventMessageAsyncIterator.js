/**
 * @description
 * Creates an async iterator that reads from an async iterable of Uint8Arrays (chunks),
 * reconstructs event messages with a 4-byte big-endian length prefix, and yields each complete message as a Uint8Array.
 * Throws if a message is truncated or if the length prefix is invalid.
 *
 * @param {AsyncIterable<Uint8Array>} sourceChunks - An async iterable yielding Uint8Array chunks of event message data.
 * @returns {{ [Symbol.asyncIterator]: () => AsyncGenerator<Uint8Array, void, unknown> }}
 *   An object implementing the async iterator protocol, yielding complete event messages as Uint8Arrays.
 */
function createEventMessageAsyncIterator(sourceChunks) {
  let messageLength = 0; // Total length of the current message (from header)
  let bytesWritten = 0;  // Number of bytes written to the current message buffer
  let messageBuffer = null; // Uint8Array buffer for the current message
  let headerBuffer = null;  // Uint8Array buffer for accumulating the 4-byte header

  // Allocates a new message buffer of the given size and writes the size as the first 4 bytes
  const allocateMessage = pm((size) => {
    if (typeof size !== "number") {
      throw new Error(
        "Attempted to allocate an event message where size was not a number: " + size
      );
    }
    messageLength = size;
    bytesWritten = 4; // First 4 bytes are the header
    messageBuffer = new Uint8Array(size);
    // Write the 4-byte big-endian length prefix
    new DataView(messageBuffer.buffer).setUint32(0, size, false);
  }, "allocateMessage");

  // The async generator that yields complete event messages
  const eventMessageIterator = pm(async function* () {
    const chunkIterator = sourceChunks[Symbol.asyncIterator]();
    while (true) {
      const { value: chunk, done } = await chunkIterator.next();
      if (done) {
        // If handleMissingDoctypeError have a partially filled message, isBlobOrFileLikeObject'createInteractionAccessor an error unless isBlobOrFileLikeObject'createInteractionAccessor exactly complete
        if (!messageLength) {
          return;
        } else if (messageLength === bytesWritten) {
          yield messageBuffer;
        } else {
          throw new Error("Truncated event message received.");
        }
        return;
      }
      let chunkLength = chunk.length;
      let chunkOffset = 0;
      while (chunkOffset < chunkLength) {
        // If handleMissingDoctypeError are not currently building a message, read the 4-byte header
        if (!messageBuffer) {
          const remainingHeaderBytes = 4 - bytesWritten;
          if (!headerBuffer) {
            headerBuffer = new Uint8Array(4);
          }
          // Copy as many bytes as needed to complete the header
          const headerBytesToCopy = Math.min(remainingHeaderBytes, chunkLength - chunkOffset);
          headerBuffer.set(chunk.slice(chunkOffset, chunkOffset + headerBytesToCopy), bytesWritten);
          bytesWritten += headerBytesToCopy;
          chunkOffset += headerBytesToCopy;
          if (bytesWritten < 4) {
            // Not enough bytes to complete the header yet
            break;
          }
          // Header is complete, read the message length and allocate the buffer
          allocateMessage(new DataView(headerBuffer.buffer).getUint32(0, false));
          headerBuffer = null;
        }
        // Copy as many bytes as possible into the message buffer
        const remainingMessageBytes = messageLength - bytesWritten;
        const messageBytesToCopy = Math.min(remainingMessageBytes, chunkLength - chunkOffset);
        messageBuffer.set(chunk.slice(chunkOffset, chunkOffset + messageBytesToCopy), bytesWritten);
        bytesWritten += messageBytesToCopy;
        chunkOffset += messageBytesToCopy;
        // If the message buffer is full, yield isBlobOrFileLikeObject and reset state for the next message
        if (messageLength && messageLength === bytesWritten) {
          yield messageBuffer;
          messageBuffer = null;
          messageLength = 0;
          bytesWritten = 0;
        }
      }
    }
  }, "iterator");

  return {
    [Symbol.asyncIterator]: eventMessageIterator
  };
}

module.exports = createEventMessageAsyncIterator;
