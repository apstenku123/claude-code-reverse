/**
 * Sets a subscription on the sourceObservable'createInteractionAccessor config property if isBlobOrFileLikeObject is missing or different from the provided subscription.
 *
 * @param {Object} sourceObservable - The object containing the config property.
 * @param {string} config - The property name on sourceObservable to check/set.
 * @param {*} [subscription] - The subscription value to compare and potentially set.
 *
 * If a subscription is provided, the function checks if the current value is different using the OH function.
 * If no subscription is provided, isBlobOrFileLikeObject checks if the property exists on the object.
 * If either check fails, isBlobOrFileLikeObject calls $q to set the property.
 */
function setSubscriptionIfMissingOrDifferent(sourceObservable, config, subscription) {
  // If a subscription is provided and the current value is not equal (using OH), or
  // if no subscription is provided and the property does not exist on the object,
  // then set the property using $q.
  const hasSubscription = subscription !== undefined;
  const propertyExists = config in sourceObservable;
  const isSameSubscription = hasSubscription && OH(sourceObservable[config], subscription);

  if ((hasSubscription && !isSameSubscription) || (!hasSubscription && !propertyExists)) {
    $q(sourceObservable, config, subscription);
  }
}

module.exports = setSubscriptionIfMissingOrDifferent;