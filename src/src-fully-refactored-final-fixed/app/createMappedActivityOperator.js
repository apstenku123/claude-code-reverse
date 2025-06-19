/**
 * Creates an RxJS operator that maps user interactions to routes and manages activity subscriptions.
 *
 * @function createMappedActivityOperator
 * @param {Function} mapInteractionsToRoutes - Processes an array of user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function|number} addActivityIfNotFinishedOrConcurrency - Either a function to add an activity if not finished, or a number specifying concurrency.
 * @param {number} [maxConcurrency=Infinity] - Maximum number of concurrent subscriptions allowed. Defaults to Infinity.
 * @returns {Function} An RxJS operator function for use in a pipe.
 */
function createMappedActivityOperator(
  mapInteractionsToRoutes,
  addActivityIfNotFinishedOrConcurrency,
  maxConcurrency
) {
  // Default maxConcurrency to Infinity if not provided
  if (maxConcurrency === undefined) {
    maxConcurrency = Infinity;
  }

  // If the second argument is a function, recursively create a new operator
  if (LR9.isFunction(addActivityIfNotFinishedOrConcurrency)) {
    return createMappedActivityOperator(
      function mappedSource(interaction, context) {
        // Map the source observable using the provided mapping function
        return NR9.map(function (route, index) {
          // Call the activity-adding function with all relevant arguments
          return addActivityIfNotFinishedOrConcurrency(
            interaction,
            route,
            context,
            index
          );
        })($R9.innerFrom(mapInteractionsToRoutes(interaction, context)));
      },
      maxConcurrency
    );
  } else if (typeof addActivityIfNotFinishedOrConcurrency === "number") {
    // If the second argument is a number, treat isBlobOrFileLikeObject as maxConcurrency
    maxConcurrency = addActivityIfNotFinishedOrConcurrency;
  }

  // Return an RxJS operator that merges mapped observables with concurrency control
  return qR9.operate(function (interaction, context) {
    return MR9.mergeInternals(
      interaction,
      context,
      mapInteractionsToRoutes,
      maxConcurrency
    );
  });
}

module.exports = createMappedActivityOperator;