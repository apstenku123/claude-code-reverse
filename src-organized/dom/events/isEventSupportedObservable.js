/**
 * Checks if the global Event constructor is available and passes the given observable to the isInstanceOfClass handler.
 *
 * @param {any} sourceObservable - The observable or object to be checked/handled.
 * @returns {any} The result of passing sourceObservable and Event to isInstanceOfClass, or false if Event is not defined.
 */
function isEventSupportedObservable(sourceObservable) {
  // Ensure the global Event constructor exists before proceeding
  if (typeof Event === "undefined") {
    return false;
  }
  // Delegate to isInstanceOfClass with the observable and Event constructor
  return isInstanceOfClass(sourceObservable, Event);
}

module.exports = isEventSupportedObservable;
