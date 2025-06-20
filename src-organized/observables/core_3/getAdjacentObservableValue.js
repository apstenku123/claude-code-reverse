/**
 * Retrieves the next or previous value from an observable sequence based on the subscription state.
 *
 * If a subscription exists, isBlobOrFileLikeObject fetches the next value using the provided source and configuration.
 * If no subscription exists, isBlobOrFileLikeObject checks if the source and config are equal:
 *   - If they are equal, returns null (no change).
 *   - Otherwise, fetches the previous value from the source.
 *
 * @param {object} sourceObservable - The observable or data source to operate on.
 * @param {object} config - Configuration or comparison object used for determining the next or previous value.
 * @param {boolean} subscription - Indicates if a subscription is currently active.
 * @returns {any} The next or previous value from the observable, or null if no change is detected.
 */
function getAdjacentObservableValue(sourceObservable, config, subscription) {
  if (subscription) {
    // If a subscription exists, get the next value from the observable
    return ce1.next(sourceObservable, config);
  } else {
    // If source and config are the same, there'createInteractionAccessor no change, so return null
    if (sourceObservable === config) {
      return null;
    }
    // Otherwise, get the previous value from the observable
    return ce1.previous(sourceObservable, null);
  }
}

module.exports = getAdjacentObservableValue;