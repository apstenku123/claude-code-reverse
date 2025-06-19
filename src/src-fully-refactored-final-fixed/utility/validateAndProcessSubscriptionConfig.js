/**
 * Validates a subscription object and processes a configuration value if valid.
 *
 * This utility function checks if the provided subscription object is valid using vB().
 * If valid, isBlobOrFileLikeObject determines whether the config parameter is a number or a string:
 *   - If config is a number, isBlobOrFileLikeObject checks if the subscription is an array-like object (PH()),
 *     and if the config value is a valid index within the subscription'createInteractionAccessor length (Nq()).
 *   - If config is a string, isBlobOrFileLikeObject checks if that property exists in the subscription object.
 * If either check passes, isBlobOrFileLikeObject processes the value at the specified index or property using OH().
 *
 * @param {any} sourceObservable - The source observable or context for processing.
 * @param {number|string} config - Index (number) or property name (string) to access in the subscription.
 * @param {object} subscription - The subscription object to validate and process.
 * @returns {boolean} Returns true if the subscription is valid and the config is processed; otherwise, false.
 */
function validateAndProcessSubscriptionConfig(sourceObservable, config, subscription) {
  // Check if the subscription object is valid
  if (!vB(subscription)) {
    return false;
  }

  const configType = typeof config;

  // If config is a number, check if subscription is array-like and index is valid
  if (configType === "number") {
    if (PH(subscription) && Nq(config, subscription.length)) {
      return OH(subscription[config], sourceObservable);
    }
  }
  // If config is a string, check if property exists in subscription
  else if (configType === "string" && config in subscription) {
    return OH(subscription[config], sourceObservable);
  }

  // If none of the above, return false
  return false;
}

module.exports = validateAndProcessSubscriptionConfig;