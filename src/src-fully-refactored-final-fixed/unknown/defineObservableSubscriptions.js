/**
 * Defines property getters on the target object for each subscription in the subscriptionsConfig object.
 * Each property is made enumerable and uses the getter function provided in subscriptionsConfig.
 *
 * @param {Object} targetObject - The object on which to define subscription getters.
 * @param {Object} subscriptionsConfig - An object whose keys are subscription names and values are getter functions.
 * @returns {void}
 */
function defineObservableSubscriptions(targetObject, subscriptionsConfig) {
  // Iterate over each subscription in the configuration object
  for (const subscriptionName in subscriptionsConfig) {
    // Define an enumerable getter property on the target object
    d81(targetObject, subscriptionName, {
      get: subscriptionsConfig[subscriptionName],
      enumerable: true
    });
  }
}

module.exports = defineObservableSubscriptions;
