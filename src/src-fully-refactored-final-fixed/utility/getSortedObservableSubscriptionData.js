/**
 * Retrieves and formats subscription data from an observable object.
 *
 * @param {Object} sourceObservable - The observable object containing subscription data under a specific property.
 * @param {string} [formatType="key+value"] - Determines the output format: "key" for lowercased keys, "value" for joined values, or "key+value" for both.
 * @returns {Array<string>|Array<[string, string]>} - An array of formatted subscription data, sorted by key.
 */
function getSortedObservableSubscriptionData(sourceObservable, formatType = "key+value") {
  // The property name holding the subscription data (assumed to be a constant elsewhere)
  const subscription = _Q;

  // Get all keys from the subscription object, sort them alphabetically
  const sortedKeys = Object.keys(sourceObservable[subscription]).sort();

  // Map each key to the desired output format
  return sortedKeys.map(
    formatType === "key"
      // If formatType is "key", return the lowercased key
      ? function (key) {
          return key.toLowerCase();
        }
      : formatType === "value"
      // If formatType is "value", return the joined values as a string
      ? function (key) {
          return sourceObservable[subscription][key].join(", ");
        }
      // Default: return an array with lowercased key and joined values
      : function (key) {
          return [key.toLowerCase(), sourceObservable[subscription][key].join(", ")];
        }
  );
}

module.exports = getSortedObservableSubscriptionData;