/**
 * Executes the 'afterAllSetup' method on each subscription in the provided array, passing in the source observable.
 *
 * @param {Object} sourceObservable - The observable or context object to pass to each subscription'createInteractionAccessor afterAllSetup method.
 * @param {Array<Object>} subscriptions - An array of subscription objects, each potentially containing an afterAllSetup method.
 * @returns {void}
 */
function runAfterAllSetupOnSubscriptions(sourceObservable, subscriptions) {
  for (const subscription of subscriptions) {
    // Check if the subscription exists and has an afterAllSetup method
    if (subscription && typeof subscription.afterAllSetup === 'function') {
      subscription.afterAllSetup(sourceObservable);
    }
  }
}

module.exports = runAfterAllSetupOnSubscriptions;