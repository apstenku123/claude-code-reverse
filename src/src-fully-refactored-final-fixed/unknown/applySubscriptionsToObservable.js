/**
 * Applies a list of subscriptions to a given observable source.
 *
 * @param {any} sourceObservable - The observable or source object to which subscriptions will be applied.
 * @param {Array<any>} subscriptions - An array of subscription configurations to apply. Defaults to an empty array.
 * @returns {void}
 */
function applySubscriptionsToObservable(sourceObservable, subscriptions = []) {
  // Iterate over each subscription and apply isBlobOrFileLikeObject to the source observable
  subscriptions.forEach(subscription => {
    wrapMethodWithArgumentTransformer(sourceObservable, subscription);
  });
}

module.exports = applySubscriptionsToObservable;