/**
 * Processes the buffered data of a readable stream, appends each buffer entry using appendInteractionEntry,
 * handles the 'end' event, and resumes the stream to ensure all data is read.
 *
 * @param {Object} streamWrapper - An object containing a readable stream and its body property.
 * @param {Object} streamWrapper.stream - The readable stream to process.
 * @param {any} streamWrapper.body - The body associated with the stream (null if not present).
 * @returns {void}
 */
function processStreamBufferAndResume(streamWrapper) {
  if (streamWrapper.body === null) return;

  // Destructure the internal readable state from the stream
  const { _readableState: readableState } = streamWrapper.stream;

  // If bufferIndex exists, process buffered entries from bufferIndex to end
  if (readableState.bufferIndex) {
    const startIndex = readableState.bufferIndex;
    const bufferLength = readableState.buffer.length;
    for (let bufferIndex = startIndex; bufferIndex < bufferLength; bufferIndex++) {
      appendInteractionEntry(streamWrapper, readableState.buffer[bufferIndex]);
    }
  } else {
    // Otherwise, process all entries in the buffer
    for (const bufferEntry of readableState.buffer) {
      appendInteractionEntry(streamWrapper, bufferEntry);
    }
  }

  // If the stream has already emitted 'end', call handleStreamResponse with the NF property
  if (readableState.endEmitted) {
    handleStreamResponse(this[NF]);
  } else {
    // Otherwise, register an 'end' event handler to call handleStreamResponse when the stream ends
    streamWrapper.stream.on("end", function () {
      handleStreamResponse(this[NF]);
    });
  }

  // Resume the stream to continue reading
  streamWrapper.stream.resume();

  // Read from the stream until no more data is available
  while (streamWrapper.stream.read() != null);
}

module.exports = processStreamBufferAndResume;