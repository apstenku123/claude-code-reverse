/**
 * Creates an operator function that lifts an Observable-like object using a provided processing function.
 *
 * @param {Function} processInteractionEntries - Function to process each subscription entry. Typically, this processes an array of interaction entries, mapping each to a route name and storing associated metadata such as duration, user, transaction, and replay updateSnapshotAndNotify. Manages the mapping size and prevents duplicate or unnecessary entries.
 * @returns {Function} Operator function that takes an Observable-like object and returns a lifted Observable.
 * @throws {TypeError} If the provided object is not a recognized Observable type.
 */
function createLiftingOperator(processInteractionEntries) {
  return function liftObservable(observableLike) {
    // Check if the provided object is a recognized Observable type
    if ($zA(observableLike)) {
      // Use the object'createInteractionAccessor lift method to apply the processing function
      return observableLike.lift(function liftedOperator(subscription) {
        try {
          // Call the processing function with the subscription and current context
          return processInteractionEntries(subscription, this);
        } catch (error) {
          // Forward any errors to the current context'createInteractionAccessor error handler
          this.error(error);
        }
      });
    }
    // If the object is not a recognized Observable, throw an error
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

module.exports = createLiftingOperator;