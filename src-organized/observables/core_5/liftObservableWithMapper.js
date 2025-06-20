/**
 * Applies a mapping function to an Observable-like object using its 'lift' method.
 * Throws an error if the provided object is not a recognized Observable type.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes a subscription and context, returning a mapped Observable.
 * @returns {Function} - a function that takes an Observable-like object and returns a new lifted Observable.
 */
function liftObservableWithMapper(mapInteractionsToRoutes) {
  return function (observableLike) {
    // Check if the provided object is a recognized Observable type
    if ($zA(observableLike)) {
      // Use the 'lift' method to apply the mapping function
      return observableLike.lift(function (subscription) {
        try {
          // Apply the mapping function with the current subscription and context
          return mapInteractionsToRoutes(subscription, this);
        } catch (error) {
          // Forward any errors to the Observable'createInteractionAccessor error handler
          this.error(error);
        }
      });
    }
    // Throw an error if the object is not a recognized Observable
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

module.exports = liftObservableWithMapper;