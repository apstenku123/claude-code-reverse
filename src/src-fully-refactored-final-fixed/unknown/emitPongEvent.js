/**
 * Emits a 'pong' event with the provided payload using the internal event emitter.
 *
 * @param {any} payload - The data to send with the 'pong' event.
 * @returns {void}
 */
function emitPongEvent(payload) {
  // Emit the 'pong' event with the given payload using the internal event emitter
  this.internalEventEmitter.emit("pong", payload);
}

module.exports = emitPongEvent;