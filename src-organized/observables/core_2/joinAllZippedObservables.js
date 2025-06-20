/**
 * Combines all inner observables emitted by the source observable using the zip operator.
 *
 * This function applies the 'zip' combination strategy to all inner observables emitted by the source observable.
 * It delegates the combination logic to the '_x9.joinAllInternals' utility, passing in the 'zip' operator and the source observable.
 *
 * @param {Observable<Observable<any>>} sourceObservable - The observable that emits inner observables to be combined.
 * @returns {Observable<any[]>} An observable emitting arrays of values, each containing the latest values from each inner observable, zipped together.
 */
function joinAllZippedObservables(sourceObservable) {
  // Use the joinAllInternals utility to combine inner observables with the zip operator
  return _x9.joinAllInternals(Sx9.zip, sourceObservable);
}

module.exports = joinAllZippedObservables;