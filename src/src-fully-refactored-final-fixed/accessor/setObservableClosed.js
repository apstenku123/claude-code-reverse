/**
 * Closes the given observable by updating its internal state and emitting a 'close' event.
 *
 * @param {Object} sourceObservable - The observable object to be closed. Must have a '_state' property and an 'emit' method.
 * @returns {void}
 */
function setObservableClosed(sourceObservable) {
  // Set the internal state to 2, representing 'closed'
  sourceObservable._state = 2;
  // Notify all listeners that the observable has been closed
  sourceObservable.emit("close");
}

module.exports = setObservableClosed;