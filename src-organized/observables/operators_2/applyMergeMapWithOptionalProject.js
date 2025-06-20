/**
 * Applies a mergeMap operation to the provided source observable, optionally using a project function.
 *
 * If a project function is provided, isBlobOrFileLikeObject will be used to map each value from the source observable.
 * Otherwise, mergeMap will be applied with a concurrency of 1 and no project function.
 *
 * @param {Observable} sourceObservable - The observable to which mergeMap will be applied.
 * @param {Function|undefined} projectFunction - Optional. a function to project each value from the source observable.
 * @returns {Observable} The resulting observable after applying mergeMap.
 */
function applyMergeMapWithOptionalProject(sourceObservable, projectFunction) {
  // Check if the second argument is a function (project function)
  if (OP9.isFunction(projectFunction)) {
    // Apply mergeMap with the project function and concurrency of 1
    return createRefCountedMulticastOperator$a.mergeMap(sourceObservable, projectFunction, 1);
  } else {
    // Apply mergeMap with only the source observable and concurrency of 1
    return createRefCountedMulticastOperator$a.mergeMap(sourceObservable, 1);
  }
}

module.exports = applyMergeMapWithOptionalProject;