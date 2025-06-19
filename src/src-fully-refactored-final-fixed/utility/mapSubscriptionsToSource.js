/**
 * Maps each subscription key from the config object to its corresponding value in the sourceObservable object.
 * Utilizes the external Xy function to iterate over the config and retrieve values from sourceObservable.
 *
 * @param {Object} sourceObservable - The object containing observable values to be mapped.
 * @param {Array|string|Object} config - The configuration specifying which keys/subscriptions to map from the sourceObservable.
 * @returns {any} The result of mapping each subscription key in config to its value in sourceObservable, as processed by Xy.
 */
function mapSubscriptionsToSource(sourceObservable, config) {
  // Use Xy to iterate over each subscription key in config and retrieve its value from sourceObservable
  return Xy(config, function (subscription) {
    return sourceObservable[subscription];
  });
}

module.exports = mapSubscriptionsToSource;