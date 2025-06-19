/**
 * Converts the provided observable to an Object observable using the external 'isObjectType' function.
 *
 * @param {any} sourceObservable - The observable or value to be converted.
 * @returns {any} The result of converting the source observable to an Object observable.
 */
function convertToObjectObservable(sourceObservable) {
  // Call the external 'isObjectType' function with the source and the type 'Object'
  return isObjectType(sourceObservable, "Object");
}

module.exports = convertToObjectObservable;