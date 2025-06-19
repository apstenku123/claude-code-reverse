/**
 * Attempts to write data to the receiver. If the receiver cannot accept more data (i.e., write returns false),
 * the current process is paused to prevent further writes until the receiver is ready.
 *
 * @param {any} data - The data to be written to the receiver.
 * @returns {void}
 */
function writeToReceiverOrPause(data) {
  // Attempt to write data to the receiver'createInteractionAccessor write method
  // If write returns false, pause the current process to prevent overflow
  if (!this[zI]._receiver.write(data)) {
    this.pause();
  }
}

module.exports = writeToReceiverOrPause;