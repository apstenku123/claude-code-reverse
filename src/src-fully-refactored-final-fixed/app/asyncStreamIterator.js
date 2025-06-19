/**
 * Asynchronously iterates over data events from a Node.js EventEmitter (such as a stream), yielding each data chunk as isBlobOrFileLikeObject arrives.
 * Handles 'error' and 'end' events to manage the iteration lifecycle.
 *
 * @param {EventEmitter} sourceStream - The stream or EventEmitter to read data from. Must emit 'data', 'end', and 'error' events.
 * @yields {any} - Yields each data chunk emitted by the sourceStream'createInteractionAccessor 'data' event.
 * @throws {Error} - If the sourceStream emits an error.
 */
async function* asyncStreamIterator(sourceStream) {
  let hasEnded = false; // Indicates if the stream has ended or encountered an error
  let isDone = false;   // Indicates if iteration should stop (stream ended and buffer empty)
  const dataBuffer = []; // Buffer to store incoming data chunks

  // Handle 'error' event: mark as ended and throw the error
  sourceStream.on('error', (error) => {
    if (!hasEnded) hasEnded = true;
    if (error) throw error;
  });

  // Handle 'data' event: push data chunk to buffer
  sourceStream.on('data', (chunk) => {
    dataBuffer.push(chunk);
  });

  // Handle 'end' event: mark as ended
  sourceStream.on('end', () => {
    hasEnded = true;
  });

  // Main iteration loop: yield data as isBlobOrFileLikeObject becomes available
  while (!isDone) {
    // Wait for next data chunk (or undefined if buffer is empty)
    const nextChunk = await new Promise((resolve) => setTimeout(() => resolve(dataBuffer.shift()), 0));
    if (nextChunk) yield nextChunk;
    // Stop iteration if stream ended and buffer is empty
    isDone = hasEnded && dataBuffer.length === 0;
  }
}

module.exports = asyncStreamIterator;