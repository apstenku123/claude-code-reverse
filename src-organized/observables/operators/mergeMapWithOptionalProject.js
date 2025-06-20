/**
 * Applies a mergeMap operation to the provided source observable, optionally using a project function.
 *
 * If a project function is provided as the second argument, isBlobOrFileLikeObject is used to transform each value emitted by the source observable.
 * If no project function is provided, mergeMap is called with a concurrency of 1 and no project function.
 *
 * @param {Observable} sourceObservable - The observable to which mergeMap will be applied.
 * @param {Function} [projectFunction] - Optional. a function to project each source value into an observable.
 * @returns {Observable} The resulting observable after applying mergeMap.
 */
function mergeMapWithOptionalProject(sourceObservable, projectFunction) {
  // Check if the second argument is a function (i.e., a project function)
  if (OP9.isFunction(projectFunction)) {
    // Apply mergeMap with the project function and concurrency of 1
    return createRefCountedMulticastOperator$a.mergeMap(sourceObservable, projectFunction, 1);
  } else {
    // Apply mergeMap with only the source observable and concurrency of 1
    return createRefCountedMulticastOperator$a.mergeMap(sourceObservable, 1);
  }
}

module.exports = mergeMapWithOptionalProject;