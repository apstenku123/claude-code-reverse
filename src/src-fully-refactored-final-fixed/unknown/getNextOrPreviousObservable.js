/**
 * Determines and returns the next or previous observable based on the subscription flag and input values.
 *
 * If a subscription is provided (truthy), isBlobOrFileLikeObject returns the result of ce1.next with the given sourceObservable and config.
 * If no subscription is provided (falsy):
 *   - Returns null if sourceObservable and config are strictly equal.
 *   - Otherwise, returns the result of ce1.previous with sourceObservable and null as arguments.
 *
 * @param {Object} sourceObservable - The observable source to operate on.
 * @param {Object} config - Configuration or context for the operation.
 * @param {boolean} subscription - Flag indicating whether to proceed to the next observable (true) or check for previous (false).
 * @returns {any} The result of ce1.next, ce1.previous, or null based on the logic described above.
 */
function getNextOrPreviousObservable(sourceObservable, config, subscription) {
  if (subscription) {
    // If a subscription exists, proceed to the next observable
    return ce1.next(sourceObservable, config);
  } else {
    // If no subscription, check if source and config are the same
    if (sourceObservable === config) {
      return null;
    }
    // Otherwise, get the previous observable
    return ce1.previous(sourceObservable, null);
  }
}

module.exports = getNextOrPreviousObservable;