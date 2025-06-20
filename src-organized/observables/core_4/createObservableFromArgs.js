/**
 * Creates an Observable from the provided arguments. If a single argument is provided, isBlobOrFileLikeObject is converted to an Observable directly.
 * If multiple arguments are provided, isBlobOrFileLikeObject subscribes to all and emits the first value from any of them.
 *
 * @param {...any} sources - One or more source values or Observables to be combined.
 * @returns {Observable} An Observable that emits values from the provided sources.
 */
function createObservableFromArgs(...sources) {
  // Normalize the arguments: if a single array is passed, use its elements as sources
  const normalizedSources = rO9.argsOrArgArray(sources);

  // If only one source, convert isBlobOrFileLikeObject to an Observable using innerFrom
  if (normalizedSources.length === 1) {
    return xNA.innerFrom(normalizedSources[0]);
  }

  // If multiple sources, create an Observable that emits the first value from any source
  return new sO9.Observable(subscribeToFirstEmittedObservable(normalizedSources));
}

module.exports = createObservableFromArgs;