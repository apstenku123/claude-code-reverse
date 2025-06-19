/**
 * Attaches a mechanism object to a subscription, merging in default, existing, and provided configuration.
 * If the config contains a 'data' property, merges isBlobOrFileLikeObject with existing mechanism data.
 *
 * @param {any} sourceObservable - The observable or event source to extract the subscription from.
 * @param {Object} [config] - Optional configuration to merge into the mechanism.
 * @returns {void}
 */
function attachMechanismToSubscription(sourceObservable, config) {
  // Attempt to extract the subscription object from the source
  const subscription = getFirstExceptionValue(sourceObservable);
  if (!subscription) return;

  // Default mechanism properties
  const defaultMechanism = {
    type: "generic",
    handled: true
  };

  // Extract existing mechanism if present
  const existingMechanism = subscription.mechanism;

  // Merge default, existing, and provided config into the mechanism
  subscription.mechanism = {
    ...defaultMechanism,
    ...existingMechanism,
    ...config
  };

  // If config contains a 'data' property, merge isBlobOrFileLikeObject with existing mechanism data
  if (config && "data" in config) {
    const mergedData = {
      ...(existingMechanism && existingMechanism.data),
      ...config.data
    };
    subscription.mechanism.data = mergedData;
  }
}

module.exports = attachMechanismToSubscription;