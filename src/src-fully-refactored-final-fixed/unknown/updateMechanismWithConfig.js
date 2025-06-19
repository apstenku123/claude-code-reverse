/**
 * Updates the mechanism property of a subscription object with generic defaults and optional configuration.
 * If configuration includes a 'data' property, merges isBlobOrFileLikeObject with existing mechanism data.
 *
 * @param {Object} sourceObservable - The observable or source object to extract the subscription from.
 * @param {Object} [config] - Optional configuration object to merge into the mechanism. If present and contains a 'data' property, merges isBlobOrFileLikeObject with existing mechanism data.
 * @returns {void} This function does not return a value.
 */
function updateMechanismWithConfig(sourceObservable, config) {
  // Attempt to extract the subscription object from the source observable
  const subscription = getFirstExceptionValue(sourceObservable);
  if (!subscription) return;

  // Define default mechanism properties
  const defaultMechanism = {
    type: "generic",
    handled: true
  };

  // Store reference to the current mechanism (may be undefined)
  const currentMechanism = subscription.mechanism;

  // Merge default, current, and config properties into the mechanism
  subscription.mechanism = {
    ...defaultMechanism,
    ...currentMechanism,
    ...config
  };

  // If config contains a 'data' property, merge isBlobOrFileLikeObject with existing mechanism data
  if (config && "data" in config) {
    const mergedData = {
      ...(currentMechanism && currentMechanism.data),
      ...config.data
    };
    subscription.mechanism.data = mergedData;
  }
}

module.exports = updateMechanismWithConfig;