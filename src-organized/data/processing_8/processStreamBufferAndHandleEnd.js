/**
 * Processes the buffer of a readable stream, handling each buffered item and managing the stream'createInteractionAccessor end event.
 *
 * @param {Object} streamWrapper - An object containing a readable stream and related metadata.
 * @returns {void}
 *
 * This function iterates through the buffered data of the provided stream, processes each item,
 * attaches an 'end' event handler if needed, resumes the stream, and drains any remaining data.
 */
function processStreamBufferAndHandleEnd(streamWrapper) {
  // If the stream body is null, there is nothing to process
  if (streamWrapper.body === null) return;

  // Destructure the internal readable state from the stream
  const { _readableState: readableState } = streamWrapper.stream;

  // Process buffered data
  if (readableState.bufferIndex) {
    // If bufferIndex is defined, process from bufferIndex to buffer.length
    const startIndex = readableState.bufferIndex;
    const bufferLength = readableState.buffer.length;
    for (let bufferIndex = startIndex; bufferIndex < bufferLength; bufferIndex++) {
      appendActivityAndUpdateLength(streamWrapper, readableState.buffer[bufferIndex]);
    }
  } else {
    // Otherwise, process all items in the buffer
    for (const bufferedItem of readableState.buffer) {
      appendActivityAndUpdateLength(streamWrapper, bufferedItem);
    }
  }

  // Handle the 'end' event of the stream
  if (readableState.endEmitted) {
    // If the end has already been emitted, call the end handler immediately
    handleStreamResponse(this[NF]);
  } else {
    // Otherwise, attach an 'end' event handler
    streamWrapper.stream.on("end", function () {
      handleStreamResponse(this[NF]);
    });
  }

  // Resume the stream to continue processing
  streamWrapper.stream.resume();

  // Drain any remaining data from the stream
  while (streamWrapper.stream.read() != null);
}

module.exports = processStreamBufferAndHandleEnd;