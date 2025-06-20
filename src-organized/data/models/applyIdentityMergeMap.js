/**
 * Applies the mergeMap operator with the identity function to the provided observable source.
 *
 * If no source observable is provided, defaults to an observable that never completes (Infinity).
 *
 * @param {Observable<any>} [sourceObservable=Infinity] - The source observable to which mergeMap will be applied.
 * @returns {Observable<any>} The resulting observable after applying mergeMap with the identity function.
 */
function applyIdentityMergeMap(sourceObservable = Infinity) {
  // RR9.mergeMap applies the mergeMap operator using the identity function (OR9.identity)
  // to the provided source observable.
  return RR9.mergeMap(OR9.identity, sourceObservable);
}

module.exports = applyIdentityMergeMap;
