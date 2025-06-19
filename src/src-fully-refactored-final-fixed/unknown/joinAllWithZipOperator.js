/**
 * Applies the 'zip' operator to the provided observable using the joinAllInternals utility.
 *
 * @param {Observable} sourceObservable - The observable to which the zip operator will be applied.
 * @returns {any} The result of joining all internals of the observable with the zip operator.
 */
function joinAllWithZipOperator(sourceObservable) {
  // Use the joinAllInternals utility from _x9 with the zip operator and the source observable
  return _x9.joinAllInternals(Sx9.zip, sourceObservable);
}

module.exports = joinAllWithZipOperator;