/**
 * Assigns a transformed property to the target object based on a subscription key.
 * If the subscription key contains a hyphen, isBlobOrFileLikeObject transforms the key to camelCase and assigns
 * the result of gO2 with four arguments. Otherwise, assigns the result of gO2 with two arguments.
 *
 * @param {Object} sourceObservable - The source object containing observable properties.
 * @param {Object} config - The configuration object containing corresponding properties.
 * @param {string} subscription - The property key, possibly hyphenated (e.g., 'foo-bar').
 * @param {Object} target - The target object to which the result will be assigned.
 */
function assignTransformedSubscriptionProperty(sourceObservable, config, subscription, target) {
  // Split the subscription key by hyphen to check for compound keys
  const subscriptionParts = subscription.split("-");

  if (subscriptionParts.length > 1) {
    // Transform the second part to start with uppercase (camelCase conversion)
    subscriptionParts[1] = subscriptionParts[1].charAt(0).toUpperCase() + subscriptionParts[1].substr(1);
    // Join the parts to form the camelCase property name
    const camelCaseKey = subscriptionParts.join("");
    // Assign the result of gO2 with four arguments to the target object
    target[camelCaseKey] = gO2(
      sourceObservable[camelCaseKey],
      sourceObservable[subscription],
      config[camelCaseKey],
      config[subscription]
    );
  } else {
    // If not a compound key, assign the result of gO2 with two arguments
    target[subscription] = gO2(
      sourceObservable[subscription],
      config[subscription]
    );
  }
}

module.exports = assignTransformedSubscriptionProperty;