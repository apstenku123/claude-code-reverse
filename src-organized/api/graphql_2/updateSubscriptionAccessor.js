/**
 * Updates the targetAccessor object with the result of gO2 based on the subscription key.
 * Handles both simple and hyphenated subscription keys by normalizing the key format.
 *
 * @param {Object} sourceObservable - The source object containing observable values.
 * @param {Object} config - The configuration object containing corresponding values.
 * @param {string} subscription - The subscription key, possibly hyphenated (e.g., 'foo-bar').
 * @param {Object} targetAccessor - The target object to update with the computed value.
 * @returns {void}
 */
function updateSubscriptionAccessor(sourceObservable, config, subscription, targetAccessor) {
  // Split the subscription key by hyphen
  const subscriptionParts = subscription.split("-");

  if (subscriptionParts.length > 1) {
    // If the key is hyphenated, capitalize the first letter of the second part
    subscriptionParts[1] = subscriptionParts[1].charAt(0).toUpperCase() + subscriptionParts[1].substr(1);
    // Join the parts to form a camelCase key
    const normalizedKey = subscriptionParts.join("");
    // Compute the value using gO2 with both the normalized and original keys
    targetAccessor[normalizedKey] = gO2(
      sourceObservable[normalizedKey],
      sourceObservable[subscription],
      config[normalizedKey],
      config[subscription]
    );
  } else {
    // For non-hyphenated keys, compute the value directly
    targetAccessor[subscription] = gO2(
      sourceObservable[subscription],
      config[subscription]
    );
  }
}

module.exports = updateSubscriptionAccessor;