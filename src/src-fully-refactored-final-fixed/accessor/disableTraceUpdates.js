/**
 * Disables trace updates by emitting a 'disableTraceUpdates' event on the provided event emitter.
 *
 * @param {Object} eventEmitter - The event emitter instance to emit the event on. Must implement an 'emit' method.
 * @returns {void}
 */
function disableTraceUpdates(eventEmitter) {
  // Emit the 'disableTraceUpdates' event to signal that trace updates should be disabled
  eventEmitter.emit("disableTraceUpdates");
}

module.exports = disableTraceUpdates;