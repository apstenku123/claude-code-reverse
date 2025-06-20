/**
 * Sets a property on the target object using the result of the gO2 function.
 * Handles both simple and hyphenated subscription keys by normalizing them to camelCase.
 *
 * @param {Object} sourceObservable - The source object containing observable properties.
 * @param {Object} config - The configuration object containing additional properties.
 * @param {string} subscriptionKey - The key (possibly hyphenated) to access properties in the source and config objects.
 * @param {Object} targetObject - The object to which the computed property will be assigned.
 */
function setGO2Property(sourceObservable, config, subscriptionKey, targetObject) {
  // Split the subscription key by hyphen to check for hyphenated keys
  const keyParts = subscriptionKey.split("-");

  if (keyParts.length > 1) {
    // Convert hyphenated key to camelCase (e.g., 'foo-bar' -> 'fooBar')
    keyParts[1] = keyParts[1].charAt(0).toUpperCase() + keyParts[1].substr(1);
    const camelCaseKey = keyParts.join("");

    // Assign the result of gO2 using the camelCase key and original hyphenated key
    targetObject[camelCaseKey] = gO2(
      sourceObservable[camelCaseKey],
      sourceObservable[subscriptionKey],
      config[camelCaseKey],
      config[subscriptionKey]
    );
  } else {
    // For non-hyphenated keys, assign directly
    targetObject[subscriptionKey] = gO2(
      sourceObservable[subscriptionKey],
      config[subscriptionKey]
    );
  }
}

module.exports = setGO2Property;