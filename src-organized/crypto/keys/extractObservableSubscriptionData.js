/**
 * Extracts and formats subscription data from an observable object.
 *
 * @param {Object} sourceObservable - The observable object containing subscription data.
 * @param {string} [formatType="key+value"] - Determines the output format: "key" for keys only, "value" for values only, or "key+value" for both.
 * @returns {Array<string>|Array<Array<string>>} An array of formatted keys, values, or key-value pairs based on the formatType.
 */
function extractObservableSubscriptionData(sourceObservable, formatType = "key+value") {
  // The property name that holds the subscription data
  const subscription = _Q;

  // Get all subscription keys, sort them alphabetically
  const sortedKeys = Object.keys(sourceObservable[subscription]).sort();

  // Map each key to the desired output format
  return sortedKeys.map(key => {
    if (formatType === "key") {
      // Return the key in lowercase
      return key.toLowerCase();
    } else if (formatType === "value") {
      // Join the array of values into a comma-separated string
      return sourceObservable[subscription][key].join(", ");
    } else {
      // Return a tuple: [lowercase key, comma-separated values]
      return [key.toLowerCase(), sourceObservable[subscription][key].join(", ")];
    }
  });
}

module.exports = extractObservableSubscriptionData;