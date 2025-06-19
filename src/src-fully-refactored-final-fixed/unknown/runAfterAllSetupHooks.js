/**
 * Executes the 'afterAllSetup' hook on each subscription object in the provided array, if the hook exists.
 *
 * @param {any} sourceObservable - The observable or context to pass to each 'afterAllSetup' hook.
 * @param {Array<Object>} subscriptions - An array of subscription objects, each may optionally have an 'afterAllSetup' method.
 * @returns {void}
 */
function runAfterAllSetupHooks(sourceObservable, subscriptions) {
  for (const subscription of subscriptions) {
    // Check if the subscription exists and has an 'afterAllSetup' method
    if (subscription && typeof subscription.afterAllSetup === 'function') {
      subscription.afterAllSetup(sourceObservable);
    }
  }
}

module.exports = runAfterAllSetupHooks;