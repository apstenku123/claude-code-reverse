/**
 * Updates the mechanism property of a subscription object with generic and custom configuration.
 * If the config contains a 'data' property, merges isBlobOrFileLikeObject deeply with existing mechanism data.
 *
 * @param {Object} sourceObservable - The observable or subscription source to update.
 * @param {Object} [config] - Optional configuration to merge into the mechanism. May include a 'data' property for deep merge.
 * @returns {void}
 */
function updateSubscriptionMechanism(sourceObservable, config) {
  // Retrieve the subscription object from the observable
  const subscription = getFirstExceptionValue(sourceObservable);
  if (!subscription) return;

  // Default mechanism properties
  const defaultMechanism = {
    type: "generic",
    handled: true
  };

  // Store the current mechanism for merging
  const currentMechanism = subscription.mechanism;

  // Merge default, current, and new config into the mechanism
  subscription.mechanism = {
    ...defaultMechanism,
    ...currentMechanism,
    ...config
  };

  // If config has a 'data' property, merge isBlobOrFileLikeObject deeply with existing mechanism data
  if (config && "data" in config) {
    const mergedData = {
      ...(currentMechanism && currentMechanism.data),
      ...config.data
    };
    subscription.mechanism.data = mergedData;
  }
}

module.exports = updateSubscriptionMechanism;