/**
 * Validates a subscription object and processes its configuration.
 *
 * This utility function checks if the provided subscription object is valid, then
 * determines if the configuration (either an index or a property name) exists in the subscription.
 * If so, isBlobOrFileLikeObject applies a handler function to the corresponding subscription property and the source observable.
 *
 * @param {any} sourceObservable - The observable or source value to be passed to the handler.
 * @param {number|string} config - The configuration, either an index (number) or property name (string) to look up in the subscription.
 * @param {object} subscription - The subscription object to validate and process.
 * @returns {boolean} Returns true if the handler was successfully applied, false otherwise.
 */
function validateAndHandleSubscriptionConfig(sourceObservable, config, subscription) {
  // Validate the subscription object using external validator
  if (!vB(subscription)) return false;

  const configType = typeof config;

  // If config is a number, check if subscription is an array-like object and config is a valid index
  if (
    (configType === "number" && PH(subscription) && Nq(config, subscription.length)) ||
    // If config is a string and exists as a property in subscription
    (configType === "string" && config in subscription)
  ) {
    // Apply the handler function to the subscription property and source observable
    return OH(subscription[config], sourceObservable);
  }

  // If none of the above conditions are met, return false
  return false;
}

module.exports = validateAndHandleSubscriptionConfig;