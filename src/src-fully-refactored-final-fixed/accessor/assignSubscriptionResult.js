/**
 * Assigns the result of the gO2 function to a target object property based on a subscription key.
 * Handles both simple and hyphenated subscription keys by normalizing the key format.
 *
 * @param {Object} sourceObservable - The source object containing observable values.
 * @param {Object} config - The configuration object containing corresponding values.
 * @param {string} subscription - The key (possibly hyphenated) indicating which property to process.
 * @param {Object} target - The target object where the result will be assigned.
 */
function assignSubscriptionResult(sourceObservable, config, subscription, target) {
  // Split the subscription key by hyphen
  const subscriptionParts = subscription.split("-");

  if (subscriptionParts.length > 1) {
    // If the key is hyphenated, capitalize the first letter of the second part
    subscriptionParts[1] = subscriptionParts[1].charAt(0).toUpperCase() + subscriptionParts[1].substr(1);
    // Join the parts to form a camelCase key
    const normalizedKey = subscriptionParts.join("");
    // Assign the result of gO2 to the target object using the normalized key
    target[normalizedKey] = gO2(
      sourceObservable[normalizedKey],
      sourceObservable[subscription],
      config[normalizedKey],
      config[subscription]
    );
  } else {
    // If the key is not hyphenated, assign the result directly
    target[subscription] = gO2(sourceObservable[subscription], config[subscription]);
  }
}

module.exports = assignSubscriptionResult;