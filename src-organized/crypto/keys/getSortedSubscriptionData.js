/**
 * Retrieves and formats the subscription data from an observable object.
 *
 * Depending on the outputFormat parameter, returns either sorted subscription keys (lowercased),
 * sorted subscription values (as comma-separated strings), or key-value pairs (with keys lowercased).
 *
 * @param {Object} observableObject - The object containing a subscription property.
 * @param {string} [outputFormat="key+value"] - Determines the output format: "key", "value", or "key+value".
 * @returns {Array<string>|Array<Array<string>>} The formatted and sorted subscription data.
 */
function getSortedSubscriptionData(observableObject, outputFormat = "key+value") {
  // The property name for the subscription data (assumed to be a symbol or string)
  const subscriptionProperty = _Q;

  // Get all subscription keys, sort them alphabetically
  const sortedKeys = Object.keys(observableObject[subscriptionProperty]).sort();

  // Map the sorted keys to the desired output format
  if (outputFormat === "key") {
    // Return lowercased keys
    return sortedKeys.map((key) => key.toLowerCase());
  } else if (outputFormat === "value") {
    // Return values as comma-separated strings
    return sortedKeys.map((key) => observableObject[subscriptionProperty][key].join(", "));
  } else {
    // Return [lowercased key, comma-separated value] pairs
    return sortedKeys.map((key) => [
      key.toLowerCase(),
      observableObject[subscriptionProperty][key].join(", ")
    ]);
  }
}

module.exports = getSortedSubscriptionData;