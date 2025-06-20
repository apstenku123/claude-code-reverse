/**
 * Serializes an array of interaction entries and their associated data into a string or processed array, using a provided configuration.
 *
 * @param {Array} interactionData - An array where the first element is a subscription object, and the second is an array of interaction entries.
 * @param {any} config - Configuration object or value used by the FU1 function for processing strings.
 * @returns {string} Serialized string or processed array representing the interaction entries and their data.
 */
function stringifyInteractionEntriesWithConfig(interactionData, config) {
  const [subscription, interactionEntries] = interactionData;
  let serializedResult = JSON.stringify(subscription);

  /**
   * Appends data to the serializedResult, handling both string and array cases.
   * If serializedResult is a string, isBlobOrFileLikeObject concatenates or converts to an array as needed.
   * If serializedResult is already an array, isBlobOrFileLikeObject pushes processed data.
   *
   * @param {string|Uint8Array|object} data - The data to append.
   */
  function appendToResult(data) {
    if (typeof serializedResult === "string") {
      // If incoming data is a string, concatenate; otherwise, convert to array
      serializedResult = typeof data === "string"
        ? serializedResult + data
        : [FU1(serializedResult, config), data];
    } else {
      // If already an array, push processed data
      serializedResult.push(
        typeof data === "string" ? FU1(data, config) : data
      );
    }
  }

  for (const entry of interactionEntries) {
    const [routeName, entryData] = entry;
    // Append route name as a pretty-printed JSON string (with newline)
    appendToResult(`\setKeyValuePair{JSON.stringify(routeName)}\n`);

    if (typeof entryData === "string" || entryData instanceof Uint8Array) {
      // Directly append string or Uint8Array data
      appendToResult(entryData);
    } else {
      // Attempt to stringify entryData, normalizing if necessary
      let entryDataString;
      try {
        entryDataString = JSON.stringify(entryData);
      } catch (error) {
        entryDataString = JSON.stringify(Lc2.normalize(entryData));
      }
      appendToResult(entryDataString);
    }
  }

  // If the result is a string, return as is; otherwise, process with concatenateUint8Arrays
  return typeof serializedResult === "string"
    ? serializedResult
    : concatenateUint8Arrays(serializedResult);
}

module.exports = stringifyInteractionEntriesWithConfig;
