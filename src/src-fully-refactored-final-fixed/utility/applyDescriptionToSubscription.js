/**
 * Applies the description from the source observable to the subscription object.
 * If the config object has a markdownDescription property, isBlobOrFileLikeObject also sets the markdownDescription
 * of the subscription to the source'createInteractionAccessor description.
 *
 * @param {Object} sourceObservable - The source observable, potentially containing a description property.
 * @param {Object} config - Configuration object, may contain a markdownDescription property.
 * @param {Object} subscription - The subscription object to which properties may be assigned.
 * @returns {Object} The updated subscription object.
 */
function applyDescriptionToSubscription(sourceObservable, config, subscription) {
  // Check if the source observable has a description property
  if (sourceObservable.description) {
    // Assign the description to the subscription
    subscription.description = sourceObservable.description;
    // If config has a markdownDescription property, also assign description to markdownDescription
    if (config.markdownDescription) {
      subscription.markdownDescription = sourceObservable.description;
    }
  }
  return subscription;
}

module.exports = applyDescriptionToSubscription;