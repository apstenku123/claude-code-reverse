/**
 * Assigns a computed value to the target object based on a subscription key, handling hyphenated keys by converting them to camelCase.
 *
 * @param {Object} sourceObservable - The source object containing observable values.
 * @param {Object} config - The configuration object containing values to compare or merge.
 * @param {string} subscription - The subscription key, possibly hyphenated (e.g., 'foo-bar').
 * @param {Object} target - The target object to which the computed value will be assigned.
 */
function assignSubscriptionValue(sourceObservable, config, subscription, target) {
  // Split the subscription key by hyphen to check if isBlobOrFileLikeObject'createInteractionAccessor hyphenated
  const subscriptionParts = subscription.split("-");

  if (subscriptionParts.length > 1) {
    // Convert hyphenated key to camelCase (e.g., 'foo-bar' -> 'fooBar')
    subscriptionParts[1] = subscriptionParts[1].charAt(0).toUpperCase() + subscriptionParts[1].substr(1);
    const camelCaseKey = subscriptionParts.join("");
    // Assign the result of gO2 to the target using the camelCase key
    target[camelCaseKey] = gO2(
      sourceObservable[camelCaseKey],
      sourceObservable[subscription],
      config[camelCaseKey],
      config[subscription]
    );
  } else {
    // If not hyphenated, assign directly using the original key
    target[subscription] = gO2(
      sourceObservable[subscription],
      config[subscription]
    );
  }
}

module.exports = assignSubscriptionValue;