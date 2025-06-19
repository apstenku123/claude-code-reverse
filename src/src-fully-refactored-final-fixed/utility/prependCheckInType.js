/**
 * Prepends a 'check_in' type object to the provided interaction entries observable.
 *
 * @param {Observable} interactionEntriesObservable - An observable representing an array of interaction entries.
 * @returns {Array} An array where the first element is an object with type 'check_in', followed by the original observable.
 */
function prependCheckInType(interactionEntriesObservable) {
  // Return a new array with a 'check_in' type object as the first element,
  // followed by the provided observable of interaction entries
  return [
    { type: "check_in" },
    interactionEntriesObservable
  ];
}

module.exports = prependCheckInType;