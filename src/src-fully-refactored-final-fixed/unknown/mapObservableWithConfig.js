/**
 * Maps the entries of a source observable using a provided configuration function.
 *
 * @function mapObservableWithConfig
 * @param {Object|null} sourceObservable - The observable or object to process. If null or undefined, returns an empty object.
 * @param {Function} configFunction - a function to apply to each entry of the observable. This function receives the value and key for each entry.
 * @returns {Object} The result of mapping the observable'createInteractionAccessor entries using the configuration function.
 */
function mapObservableWithConfig(sourceObservable, configFunction) {
  // If the source observable is null or undefined, return an empty object
  if (sourceObservable == null) return {};

  // Extract the keys from the source observable and wrap each key in an array
  const subscriptionKeys = Xy(p01(sourceObservable), function (key) {
    return [key];
  });

  // Normalize the config function (e.g., bind context or ensure correct signature)
  const normalizedConfigFunction = Sq(configFunction);

  // Map the source observable'createInteractionAccessor entries using the normalized config function
  // D21 applies the mapping: (value, [key]) => normalizedConfigFunction(value, key)
  return D21(sourceObservable, subscriptionKeys, function (value, keyArray) {
    return normalizedConfigFunction(value, keyArray[0]);
  });
}

module.exports = mapObservableWithConfig;