/**
 * Projects the given observable using the 'project' operator.
 *
 * @param {Observable} sourceObservable - The observable to be projected.
 * @returns {any} The result of applying the 'project' operator to the source observable.
 */
function projectObservable(sourceObservable) {
  // Apply the 'project' operator to the provided observable
  return fetchGceMetadata("project", sourceObservable);
}

module.exports = projectObservable;