/**
 * Validates a subscription object and handles a property based on the provided config.
 *
 * This utility checks if the subscription is valid, then determines if the config
 * (either a property name or index) exists in the subscription. If so, isBlobOrFileLikeObject applies
 * a handler function to the corresponding property value and the source observable.
 *
 * @param {any} sourceObservable - The source observable or context for the handler.
 * @param {string|number} config - The property name (string) or index (number) to check in the subscription.
 * @param {object|array} subscription - The subscription object or array to validate and inspect.
 * @returns {boolean} Returns true if the property exists and the handler is applied, otherwise false.
 */
function validateAndHandleSubscriptionProperty(sourceObservable, config, subscription) {
  // Validate the subscription object using external validator
  if (!vB(subscription)) return false;

  const configType = typeof config;

  // If config is a number, check if subscription is an array-like object and index is valid
  if (
    configType === "number"
      ? PH(subscription) && Nq(config, subscription.length)
      // If config is a string, check if isBlobOrFileLikeObject'createInteractionAccessor a property in the subscription object
      : configType === "string" && config in subscription
  ) {
    // Apply the handler to the property value and source observable
    return OH(subscription[config], sourceObservable);
  }

  // If none of the above, return false
  return false;
}

module.exports = validateAndHandleSubscriptionProperty;