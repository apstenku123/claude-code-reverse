/**
 * Sets a computed value in the target object based on the provided source and config objects.
 * If the subscription name contains a hyphen, isBlobOrFileLikeObject transforms the name to camelCase and uses isBlobOrFileLikeObject as the key.
 * Otherwise, isBlobOrFileLikeObject uses the subscription name as-is.
 * The value is computed using the gO2 function.
 *
 * @param {Object} sourceObservable - The source object containing observable values.
 * @param {Object} config - The configuration object containing corresponding values.
 * @param {string} subscription - The subscription name, possibly in hyphen-case (e.g., 'foo-bar').
 * @param {Object} target - The target object where the computed value will be set.
 */
function setGO2Property(sourceObservable, config, subscription, target) {
  // Split the subscription name by hyphen
  const subscriptionParts = subscription.split("-");

  if (subscriptionParts.length > 1) {
    // If the subscription name has a hyphen, convert to camelCase
    subscriptionParts[1] = subscriptionParts[1].charAt(0).toUpperCase() + subscriptionParts[1].substr(1);
    const camelCaseSubscription = subscriptionParts.join("");

    // Compute the value using gO2 with camelCase key and original key
    target[camelCaseSubscription] = gO2(
      sourceObservable[camelCaseSubscription],
      sourceObservable[subscription],
      config[camelCaseSubscription],
      config[subscription]
    );
  } else {
    // If no hyphen, use the subscription name as-is
    target[subscription] = gO2(sourceObservable[subscription], config[subscription]);
  }
}

module.exports = setGO2Property;