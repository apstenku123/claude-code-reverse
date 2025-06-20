/**
 * Prepends a check-in type object to the provided observable or mapping function.
 *
 * This utility function creates an array where the first element is an object
 * with a type property set to "check_in", and the second element is the provided
 * observable or mapping function (typically the result of mapInteractionsToRoutes).
 *
 * @param {Function|Object} sourceObservable - The observable or mapping function that processes user interactions.
 * @returns {Array} An array containing the check-in type object and the provided observable/mapping function.
 */
function prependCheckInTypeToObservable(sourceObservable) {
  // Create an array with a check-in type object and the provided observable/mapping function
  return [
    { type: "check_in" },
    sourceObservable
  ];
}

module.exports = prependCheckInTypeToObservable;