/**
 * Lifts a provided mapping function onto an Observable-like object, enabling transformation of its emissions.
 * Throws a TypeError if the provided object is not a recognized Observable type.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes user interaction entries and maps them to route names with metadata.
 * @returns {Function} - a function that takes an Observable-like object and returns a lifted Observable.
 */
function createObservableLifter(mapInteractionsToRoutes) {
  return function (observableCandidate) {
    // Check if the provided object is a recognized Observable type
    if ($zA(observableCandidate)) {
      // Use the Observable'createInteractionAccessor lift method to apply the mapping function
      return observableCandidate.lift(function (subscription) {
        try {
          // Apply the mapping function to the subscription, passing the current context
          return mapInteractionsToRoutes(subscription, this);
        } catch (error) {
          // Forward any errors to the Observable'createInteractionAccessor error handler
          this.error(error);
        }
      });
    }
    // Throw if the object is not a recognized Observable
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

module.exports = createObservableLifter;