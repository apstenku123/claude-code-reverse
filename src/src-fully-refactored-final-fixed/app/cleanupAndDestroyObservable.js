/**
 * Removes all event listeners from the given observable, attaches an error handler, and destroys the observable.
 *
 * @param {EventEmitter} sourceObservable - The observable or event emitter to clean up and destroy.
 * @param {any} destroyConfig - Optional configuration or error to pass to the destroy method.
 * @returns {void}
 */
function cleanupAndDestroyObservable(sourceObservable, destroyConfig) {
  // Remove all listeners for each event in the event list
  for (const eventName of Yq1) {
    sourceObservable.removeListener(eventName, Wq1[eventName]);
  }

  // Attach a generic error handler
  sourceObservable.on("error", CXA);

  // Destroy the observable, passing along any configuration or error
  sourceObservable.destroy(destroyConfig);
}

module.exports = cleanupAndDestroyObservable;