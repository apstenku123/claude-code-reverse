/**
 * Attempts to write data to the WebSocket stream. If the write buffer is full,
 * the stream is paused to prevent further writes until isBlobOrFileLikeObject drains.
 *
 * @param {any} data - The data to write to the WebSocket stream.
 * @returns {void}
 */
function writeToWebSocketOrPause(data) {
  // Attempt to write data to the WebSocket stream at the specified index/key
  // If the write returns false, the buffer is full, so pause the stream
  if (!this.ws[this.webSocketStreamKey].write(data)) {
    this.pause();
  }
}

module.exports = writeToWebSocketOrPause;