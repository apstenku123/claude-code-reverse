/**
 * Sets a property on the target object using the result of the gO2 function.
 * Handles both simple and hyphenated subscription keys by normalizing the key format.
 *
 * @param {Object} sourceObservable - The source object containing observable properties.
 * @param {Object} config - The configuration object containing corresponding properties.
 * @param {string} subscription - The property key, possibly hyphenated (e.g., 'foo-bar').
 * @param {Object} target - The target object where the result will be assigned.
 */
function setGO2Accessor(sourceObservable, config, subscription, target) {
  // Split the subscription key by hyphen
  let subscriptionParts = subscription.split("-");

  if (subscriptionParts.length > 1) {
    // Capitalize the first letter of the second part for camelCase conversion
    subscriptionParts[1] = subscriptionParts[1].charAt(0).toUpperCase() + subscriptionParts[1].substr(1);
    // Join parts to form the camelCase property name
    const camelCaseKey = subscriptionParts.join("");
    // Assign the result of gO2 to the target object using the camelCase key
    target[camelCaseKey] = gO2(
      sourceObservable[camelCaseKey],
      sourceObservable[subscription],
      config[camelCaseKey],
      config[subscription]
    );
  } else {
    // For non-hyphenated keys, assign the result of gO2 directly
    target[subscription] = gO2(sourceObservable[subscription], config[subscription]);
  }
}

module.exports = setGO2Accessor;