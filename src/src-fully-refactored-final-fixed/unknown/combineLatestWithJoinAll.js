/**
 * Combines the provided observable(createInteractionAccessor) using the combineLatest operator and joins all internal observables.
 *
 * @param {any} sourceObservable - The observable or array of observables to be combined.
 * @returns {any} The result of joining all internal observables using combineLatest.
 */
function combineLatestWithJoinAll(sourceObservable) {
  // Use VP9'createInteractionAccessor joinAllInternals method with CP9.combineLatest operator
  return VP9.joinAllInternals(CP9.combineLatest, sourceObservable);
}

module.exports = combineLatestWithJoinAll;