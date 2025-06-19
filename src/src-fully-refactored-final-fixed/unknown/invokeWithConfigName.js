/**
 * Invokes the getRulesByToolNameAndBehavior function with the provided source observable, the name property from the configuration object, and the subscription object.
 *
 * @param {Object} sourceObservable - The observable or data source to operate on.
 * @param {Object} config - Configuration object that must contain a 'name' property.
 * @param {Object} subscription - The subscription or context to be passed along.
 * @returns {*} The result of invoking getRulesByToolNameAndBehavior with the given parameters.
 */
function invokeWithConfigName(sourceObservable, config, subscription) {
  // Pass the source observable, the config'createInteractionAccessor name property, and the subscription to getRulesByToolNameAndBehavior
  return getRulesByToolNameAndBehavior(sourceObservable, config.name, subscription);
}

module.exports = invokeWithConfigName;