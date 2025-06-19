/**
 * Serializes an array of subscription objects into a single string.
 * Each object in the array should have a 'type' and 'value' property.
 * String values are wrapped in double quotes; other types are appended as-is.
 *
 * @param {Array<{type: string, value: any}>} subscriptions - Array of subscription objects to serialize
 * @returns {string} Serialized string representation of the subscription values
 */
function serializeSubscriptionValues(subscriptions) {
  let serializedResult = "";
  // Iterate over each subscription object
  subscriptions.map(subscription => {
    switch (subscription.type) {
      case "string":
        // Wrap string values in double quotes
        serializedResult += '"' + subscription.value + '"';
        break;
      default:
        // Append other types as-is
        serializedResult += subscription.value;
        break;
    }
  });
  return serializedResult;
}

module.exports = serializeSubscriptionValues;
