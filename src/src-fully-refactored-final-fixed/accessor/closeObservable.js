/**
 * Closes the given observable by updating its internal state and emitting a 'close' event.
 *
 * @param {Object} sourceObservable - The observable object to be closed. Must have a '_state' property and an 'emit' method.
 * @returns {void}
 */
function closeObservable(sourceObservable) {
  // Set the internal state to 2, indicating the observable is closed
  sourceObservable._state = 2;
  // Emit the 'close' event to notify listeners
  sourceObservable.emit("close");
}

module.exports = closeObservable;