/**
 * Converts the provided observable to a string representation using the isObjectType utility.
 *
 * @param {any} sourceObservable - The observable or value to be converted to a string.
 * @returns {string} The string representation of the provided observable.
 */
function convertObservableToString(sourceObservable) {
  // Use the isObjectType utility to convert the observable to a string
  return isObjectType(sourceObservable, "String");
}

module.exports = convertObservableToString;