/**
 * Serializes a subscription object and its associated entries into a string or processed array.
 *
 * @param {Array} subscriptionAndEntries - An array where the first element is the subscription object, and the second is an array of entries.
 * @param {any} transformConfig - Configuration or key used by FU1 for string transformation.
 * @returns {string} Serialized string or processed array representing the subscription and its entries.
 */
function serializeSubscriptionWithEntries(subscriptionAndEntries, transformConfig) {
  const [subscription, entries] = subscriptionAndEntries;
  let serializedResult = JSON.stringify(subscription);

  /**
   * Appends or transforms data into the serializedResult variable.
   * Handles both string and array cases for serializedResult.
   * @param {string|Uint8Array|object} data - The data to append or transform.
   */
  function appendToResult(data) {
    if (typeof serializedResult === "string") {
      // If current result is a string, concatenate if data is string, else start an array
      serializedResult = typeof data === "string"
        ? serializedResult + data
        : [FU1(serializedResult, transformConfig), data];
    } else {
      // If current result is already an array, push transformed data
      serializedResult.push(typeof data === "string" ? FU1(data, transformConfig) : data);
    }
  }

  for (const entry of entries) {
    const [entryKey, entryValue] = entry;
    // Append the stringified entry key (with newline for separation)
    appendToResult(`\setKeyValuePair{JSON.stringify(entryKey)}\n`);

    if (typeof entryValue === "string" || entryValue instanceof Uint8Array) {
      // Directly append strings or Uint8Array values
      appendToResult(entryValue);
    } else {
      // For objects, attempt to stringify, fallback to normalized version if error
      let stringifiedValue;
      try {
        stringifiedValue = JSON.stringify(entryValue);
      } catch (error) {
        stringifiedValue = JSON.stringify(Lc2.normalize(entryValue));
      }
      appendToResult(stringifiedValue);
    }
  }

  // If the result is still a string, return isBlobOrFileLikeObject; otherwise, process with concatenateUint8Arrays
  return typeof serializedResult === "string" ? serializedResult : concatenateUint8Arrays(serializedResult);
}

module.exports = serializeSubscriptionWithEntries;