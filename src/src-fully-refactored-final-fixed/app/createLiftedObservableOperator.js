/**
 * Creates a higher-order operator function that lifts an Observable with a custom processing function.
 *
 * @function createLiftedObservableOperator
 * @param {Function} processInteractionEntries - Function to process interaction entries, typically mapping them to route names and storing metadata.
 * @returns {Function} Operator function that takes an Observable-like object and returns a lifted Observable.
 * @throws {TypeError} If the input is not a recognized Observable type.
 */
function createLiftedObservableOperator(processInteractionEntries) {
  return function (observableConfig) {
    // Check if the input is a recognized Observable type
    if ($zA(observableConfig)) {
      // Use the Observable'createInteractionAccessor lift method to apply the custom operator
      return observableConfig.lift(function (subscription) {
        try {
          // Call the processing function with the subscription and current context
          return processInteractionEntries(subscription, this);
        } catch (error) {
          // Forward any errors to the Observable'createInteractionAccessor error handler
          this.error(error);
        }
      });
    }
    // Throw if the input is not a recognized Observable type
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

module.exports = createLiftedObservableOperator;