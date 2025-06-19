/**
 * Casts the provided observable to a String observable using the isObjectType utility function.
 *
 * @param {Observable} sourceObservable - The observable to be cast to a String observable.
 * @returns {Observable} - The resulting observable that emits String values.
 */
function castObservableToString(sourceObservable) {
  // Use the isObjectType utility to cast the observable to type 'String'
  return isObjectType(sourceObservable, "String");
}

module.exports = castObservableToString;