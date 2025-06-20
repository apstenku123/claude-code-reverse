/**
 * Casts the provided observable to an Object observable using the isObjectType utility function.
 *
 * @param {any} sourceObservable - The observable or value to be cast to an Object observable.
 * @returns {any} The result of casting the source observable to an Object observable.
 */
function castToObjectObservable(sourceObservable) {
  // Use the isObjectType utility to cast the observable to the 'Object' type
  return isObjectType(sourceObservable, "Object");
}

module.exports = castToObjectObservable;