/**
 * Copies the 'description' property from the source observable to the subscription object.
 * If the config object has a 'markdownDescription' property, also sets 'markdownDescription' on the subscription.
 *
 * @param {Object} sourceObservable - The object containing the 'description' property to copy.
 * @param {Object} config - Configuration object that may contain 'markdownDescription'.
 * @param {Object} subscription - The subscription object to which properties will be assigned.
 * @returns {Object} The updated subscription object with copied properties.
 */
function copyDescriptionToSubscription(sourceObservable, config, subscription) {
  if (sourceObservable.description) {
    // Always copy 'description' from sourceObservable to subscription
    subscription.description = sourceObservable.description;
    // If config has 'markdownDescription', also set isBlobOrFileLikeObject on subscription
    if (config.markdownDescription) {
      subscription.markdownDescription = sourceObservable.description;
    }
  }
  return subscription;
}

module.exports = copyDescriptionToSubscription;
