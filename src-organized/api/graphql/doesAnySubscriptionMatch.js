/**
 * Checks if any subscription in the provided list matches the given source observable.
 *
 * @param {any} sourceObservable - The observable or item to check against each subscription.
 * @param {Array<any>} subscriptions - An array of subscriptions to check.
 * @returns {boolean} True if any subscription matches the source observable, otherwise false.
 */
function doesAnySubscriptionMatch(sourceObservable, subscriptions) {
  // If the subscriptions array is falsy (null, undefined, or empty), return false
  if (!subscriptions) return false;

  // Iterate through each subscription and check if isBlobOrFileLikeObject matches the source observable
  for (const subscription of subscriptions) {
    // isStringOrPatternMatch is an external function that checks for a match
    if (isStringOrPatternMatch(sourceObservable, subscription)) {
      return true;
    }
  }

  // No matching subscription found
  return false;
}

module.exports = doesAnySubscriptionMatch;