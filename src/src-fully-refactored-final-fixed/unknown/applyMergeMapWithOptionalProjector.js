/**
 * Applies a mergeMap operation to the provided observable, optionally using a projector function.
 *
 * If a projector function is provided as the second argument, isBlobOrFileLikeObject will be used in the mergeMap operation.
 * Otherwise, mergeMap will be applied with a concurrency of 1 and no projector.
 *
 * @param {Observable} sourceObservable - The source observable to which mergeMap will be applied.
 * @param {Function|number} [projectorOrConcurrency] - Optional. a projector function to map values, or concurrency number.
 * @returns {Observable} The resulting observable after applying mergeMap.
 */
function applyMergeMapWithOptionalProjector(sourceObservable, projectorOrConcurrency) {
  // Check if the second argument is a function (projector)
  if (OP9.isFunction(projectorOrConcurrency)) {
    // Apply mergeMap with the projector function and concurrency of 1
    return createRefCountedMulticastOperator$a.mergeMap(sourceObservable, projectorOrConcurrency, 1);
  }
  // Apply mergeMap with only the source observable and concurrency of 1
  return createRefCountedMulticastOperator$a.mergeMap(sourceObservable, 1);
}

module.exports = applyMergeMapWithOptionalProjector;
