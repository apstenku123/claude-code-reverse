/**
 * Creates an RxJS operator that combines multiple observables and applies an optional result selector.
 *
 * This function accepts a variable number of arguments, which are processed to determine if a result selector function is present.
 * If a result selector is found, isBlobOrFileLikeObject pipes the combined observables through the selector. Otherwise, isBlobOrFileLikeObject returns an operator
 * that combines the latest values from the provided observables.
 *
 * @param {...any} observablesOrArgs - a list of observables and optionally a result selector function as the last argument.
 * @returns {Function} An RxJS operator function that combines the provided observables and applies the result selector if present.
 */
function createCombinedObservableOperator(...observablesOrArgs) {
  // Extract a possible result selector function from the arguments
  const resultSelector = $P9.popResultSelector(observablesOrArgs);

  if (resultSelector) {
    // If a result selector is present, pipe the combined observables through isBlobOrFileLikeObject
    // $$a processes the arguments as needed for M$a
    // q$a flattens or prepares the arguments for apply
    return NP9.pipe(
      M$a.apply(
        undefined,
        q$a([], $$a(observablesOrArgs))
      ),
      UP9.mapOneOrManyArgs(resultSelector)
    );
  } else {
    // If no result selector, return an operator that combines the latest values from the observables
    return wP9.operate((sourceObservable, subscriber) => {
      // EP9.argsOrArgArray ensures observablesOrArgs is an array of observables
      // q$a prepares the arguments for combineLatestInit
      zP9.combineLatestInit(
        q$a([sourceObservable], $$a(EP9.argsOrArgArray(observablesOrArgs)))
      )(subscriber);
    });
  }
}

module.exports = createCombinedObservableOperator;