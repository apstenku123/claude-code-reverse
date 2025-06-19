/**
 * Calls the `unref` method on the provided observable-like object.
 * This is typically used to allow Node.js processes to exit if this is the only active handle.
 *
 * @param {Object} observable - An object that exposes an `unref` method (e.g., a timer, socket, or subscription).
 * @returns {void}
 */
function unrefObservable(observable) {
  // Call the unref method to remove the object'createInteractionAccessor reference from the event loop
  observable.unref();
}

module.exports = unrefObservable;