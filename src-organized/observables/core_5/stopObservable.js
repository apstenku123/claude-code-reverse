/**
 * Marks the given observable as stopped by setting its 'stopped' property to true.
 *
 * @param {Object} observable - The observable object to be marked as stopped. Must have a 'stopped' property.
 * @returns {void} This function does not return a value.
 */
function stopObservable(observable) {
  // Set the 'stopped' flag to true to indicate the observable should no longer emit values
  observable.stopped = true;
}

module.exports = stopObservable;