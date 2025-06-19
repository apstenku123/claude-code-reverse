/**
 * Retrieves and formats the keys and/or values from the 'subscription' property of a source observable.
 *
 * @param {Object} sourceObservable - The object containing a '_Q' property, which holds subscription entries.
 * @param {string} [formatType="key+value"] - Determines the output format: 'key' (returns lowercased keys),
 *   'value' (returns joined values), or 'key+value' (returns [lowercased key, joined values] pairs).
 * @returns {Array<string>|Array<[string, string]>} An array of formatted keys, values, or key-value pairs.
 */
function getSortedSubscriptionEntries(sourceObservable, formatType = "key+value") {
  // '_Q' is assumed to be the property holding the subscription entries
  const subscription = sourceObservable._Q;

  // Get all keys from the subscription object and sort them alphabetically
  const sortedKeys = Object.keys(subscription).sort();

  // Map the sorted keys to the desired output format
  return sortedKeys.map(
    formatType === "key"
      ? function (key) {
          // Return the key in lowercase
          return key.toLowerCase();
        }
      : formatType === "value"
      ? function (key) {
          // Join the array of values into a comma-separated string
          return subscription[key].join(", ");
        }
      : function (key) {
          // Return a tuple: [lowercased key, joined values]
          return [key.toLowerCase(), subscription[key].join(", ")];
        }
  );
}

module.exports = getSortedSubscriptionEntries;
