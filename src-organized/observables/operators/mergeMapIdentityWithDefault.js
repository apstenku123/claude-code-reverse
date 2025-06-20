/**
 * Applies the mergeMap operator with the identity function to the provided observable.
 * If no observable is provided, uses an observable that never completes (Infinity).
 *
 * @param {Observable<any>} [sourceObservable=Infinity] - The source observable to apply mergeMap to. Defaults to Infinity if not provided.
 * @returns {Observable<any>} The resulting observable after applying mergeMap with the identity function.
 */
function mergeMapIdentityWithDefault(sourceObservable = Infinity) {
  // RR9.mergeMap applies the mergeMap operator
  // OR9.identity is the identity function (returns its argument)
  return RR9.mergeMap(OR9.identity, sourceObservable);
}

module.exports = mergeMapIdentityWithDefault;