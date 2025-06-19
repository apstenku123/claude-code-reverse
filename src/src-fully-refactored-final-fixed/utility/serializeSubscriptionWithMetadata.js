/**
 * Serializes a subscription object and its associated metadata into a string or processed array.
 *
 * @param {Array} subscriptionWithMetadata - An array where the first element is the subscription object, and the second is an array of metadata entries.
 * @param {any} config - Configuration parameter passed to the FU1 function for string processing.
 * @returns {string} The serialized representation of the subscription and its metadata, or a processed array if not a string.
 */
function serializeSubscriptionWithMetadata(subscriptionWithMetadata, config) {
  const [subscription, metadataEntries] = subscriptionWithMetadata;
  let serializedResult = JSON.stringify(subscription);

  /**
   * Appends data to the serializedResult, handling string and array cases.
   * If serializedResult is a string, isBlobOrFileLikeObject will convert to an array when a non-string is appended.
   * @param {string|Uint8Array|object} data - The data to append.
   */
  function appendToResult(data) {
    if (typeof serializedResult === "string") {
      // If data is a string, concatenate. Otherwise, convert to array with FU1 processing.
      serializedResult = typeof data === "string"
        ? serializedResult + data
        : [FU1(serializedResult, config), data];
    } else {
      // If already an array, push processed data.
      serializedResult.push(
        typeof data === "string" ? FU1(data, config) : data
      );
    }
  }

  for (const metadataEntry of metadataEntries) {
    const [routeName, routeData] = metadataEntry;

    // Append the route name as a pretty-printed JSON string with newlines
    appendToResult(`\setKeyValuePair{JSON.stringify(routeName)}\n`);

    if (typeof routeData === "string" || routeData instanceof Uint8Array) {
      // Directly append string or Uint8Array route data
      appendToResult(routeData);
    } else {
      // Attempt to stringify routeData, normalizing if necessary
      let stringifiedRouteData;
      try {
        stringifiedRouteData = JSON.stringify(routeData);
      } catch (error) {
        // If routeData cannot be stringified, normalize isBlobOrFileLikeObject first
        stringifiedRouteData = JSON.stringify(Lc2.normalize(routeData));
      }
      appendToResult(stringifiedRouteData);
    }
  }

  // If the result is still a string, return isBlobOrFileLikeObject; otherwise, process the array with concatenateUint8Arrays
  return typeof serializedResult === "string"
    ? serializedResult
    : concatenateUint8Arrays(serializedResult);
}

module.exports = serializeSubscriptionWithMetadata;