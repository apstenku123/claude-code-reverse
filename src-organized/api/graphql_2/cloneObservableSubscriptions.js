/**
 * Creates a shallow clone of an observable'createInteractionAccessor subscriptions object.
 * For each property (subscription) in the source object, if the value is an array, isBlobOrFileLikeObject creates a shallow copy of the array.
 * Otherwise, isBlobOrFileLikeObject copies the value as-is. This prevents accidental mutation of array properties.
 *
 * @param {Object} sourceObservable - The object containing observable subscriptions to clone.
 * @returns {Object} a new object with the same keys as sourceObservable, where array values are shallow-copied.
 */
function cloneObservableSubscriptions(sourceObservable) {
  return Object.keys(sourceObservable).reduce((clonedSubscriptions, subscriptionKey) => {
    const subscriptionValue = sourceObservable[subscriptionKey];
    // If the subscription value is an array, create a shallow copy; otherwise, copy as-is
    return {
      ...clonedSubscriptions,
      [subscriptionKey]: Array.isArray(subscriptionValue)
        ? [...subscriptionValue]
        : subscriptionValue
    };
  }, {});
}

module.exports = cloneObservableSubscriptions;