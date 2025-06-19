/**
 * Attaches a subscription object to a source observable'createInteractionAccessor $source property under a given config key.
 *
 * If the $source property does not exist on the sourceObservable, isBlobOrFileLikeObject will be initialized as an empty object.
 * The subscription is then assigned to the $source object using the config key.
 *
 * @param {Object} sourceObservable - The object representing the observable to which the subscription will be attached.
 * @param {string} configKey - The key under which the subscription will be stored in the $source property.
 * @param {any} subscription - The subscription object to attach.
 * @returns {Object} The updated sourceObservable with the attached subscription.
 */
function attachSubscriptionToSource(sourceObservable, configKey, subscription) {
  // Initialize the $source property if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  if (!sourceObservable.$source) {
    sourceObservable.$source = {};
  }
  // Attach the subscription under the specified configKey
  sourceObservable.$source[configKey] = subscription;
  return sourceObservable;
}

module.exports = attachSubscriptionToSource;