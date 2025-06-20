/**
 * Emits a 'message' event with the provided payload and options.
 *
 * @param {any} messagePayload - The payload to send with the 'message' event.
 * @param {any} messageOptions - Additional options or metadata for the message event.
 * @returns {void}
 *
 * @example
 * emitMessageEvent.call(context, { text: 'Hello' }, { urgent: true });
 */
function emitMessageEvent(messagePayload, messageOptions) {
  // Emit a 'message' event using the internal event emitter, passing along the payload and options
  this[zI].emit("message", messagePayload, messageOptions);
}

module.exports = emitMessageEvent;