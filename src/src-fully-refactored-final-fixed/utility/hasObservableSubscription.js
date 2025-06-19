/**
 * Checks if the given observable has an active subscription within the current context.
 *
 * @param {Object} observable - The observable to check for an active subscription.
 * @returns {boolean} Returns true if the observable has an active subscription; otherwise, false.
 */
function hasObservableSubscription(observable) {
  // Oq is assumed to be an external function that returns a collection of subscriptions for the current context
  // We check if the collection contains the provided observable
  return Oq(this, observable).has(observable);
}

module.exports = hasObservableSubscription;