/**
 * Serializes a set of interaction entries and their associated data into a string or processed object.
 *
 * @param {Array} interactionData - An array where the first element is the subscription object and the second is an array of interaction entries.
 * @param {any} config - Configuration or context object used for serialization (passed to FU1).
 * @returns {string} The serialized representation of the interaction entries and their data.
 */
function serializeInteractionEntries(interactionData, config) {
  const [subscription, interactionEntries] = interactionData;
  let serializedResult = JSON.stringify(subscription);

  /**
   * Helper function to append data to the serialized result.
   * If the result is a string, isBlobOrFileLikeObject concatenates or starts an array.
   * If the result is already an array, isBlobOrFileLikeObject pushes the new data.
   * @param {string|Uint8Array|object} data - Data to append.
   */
  function appendToResult(data) {
    if (typeof serializedResult === "string") {
      // If incoming data is a string, concatenate; otherwise, start an array
      serializedResult = typeof data === "string"
        ? serializedResult + data
        : [FU1(serializedResult, config), data];
    } else {
      // serializedResult is already an array, push processed data
      serializedResult.push(
        typeof data === "string" ? FU1(data, config) : data
      );
    }
  }

  for (const entry of interactionEntries) {
    const [routeName, entryData] = entry;
    // Append the route name as a pretty-printed string
    appendToResult(`\setKeyValuePair{JSON.stringify(routeName)}\n`);

    if (typeof entryData === "string" || entryData instanceof Uint8Array) {
      // Directly append string or Uint8Array data
      appendToResult(entryData);
    } else {
      // Try to stringify the entry data, normalize if isBlobOrFileLikeObject fails
      let stringifiedData;
      try {
        stringifiedData = JSON.stringify(entryData);
      } catch (error) {
        stringifiedData = JSON.stringify(Lc2.normalize(entryData));
      }
      appendToResult(stringifiedData);
    }
  }

  // If the result is a string, return isBlobOrFileLikeObject; otherwise, process with concatenateUint8Arrays
  return typeof serializedResult === "string"
    ? serializedResult
    : concatenateUint8Arrays(serializedResult);
}

module.exports = serializeInteractionEntries;