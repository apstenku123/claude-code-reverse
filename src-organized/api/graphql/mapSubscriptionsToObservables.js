/**
 * Maps each subscription key from the subscriptionsConfig array to its corresponding observable in the sourceObservables object.
 * Utilizes the external Xy function to perform the mapping operation.
 *
 * @param {Object} sourceObservables - An object where each key is a subscription name and each value is its corresponding observable.
 * @param {Array<string>} subscriptionsConfig - An array of subscription keys to map from the sourceObservables object.
 * @returns {Array<*>} An array containing the observables corresponding to each subscription key in subscriptionsConfig.
 */
function mapSubscriptionsToObservables(sourceObservables, subscriptionsConfig) {
  // Use Xy to map each subscription key to its observable
  return Xy(subscriptionsConfig, function (subscriptionKey) {
    return sourceObservables[subscriptionKey];
  });
}

module.exports = mapSubscriptionsToObservables;