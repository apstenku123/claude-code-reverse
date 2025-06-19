/**
 * Recursively applies a mapping function to each subscription within an observable structure.
 *
 * Traverses arrays and nested observables, applying the provided mapping function to each subscription.
 *
 * @param {any} sourceObservable - The observable or array of observables to process.
 * @param {function} mapSubscription - Function to apply to each subscription. Receives (subscription, index, sourceObservable).
 * @returns {any} The result of mapping the function over the observable structure, preserving the original shape.
 */
function mapObservableDeep(sourceObservable, mapSubscription) {
  return JE1(sourceObservable, (subscription, index) => {
    // If the current subscription is an array, recursively map each element
    if (Array.isArray(subscription)) {
      return subscription.map(element => mapObservableDeep(element, mapSubscription));
    }
    // If the current subscription is an observable-like object, recurse into isBlobOrFileLikeObject
    if (mp(subscription)) {
      return mapObservableDeep(subscription, mapSubscription);
    }
    // Otherwise, apply the mapping function to the subscription
    return mapSubscription(subscription, index, sourceObservable);
  });
}

module.exports = mapObservableDeep;