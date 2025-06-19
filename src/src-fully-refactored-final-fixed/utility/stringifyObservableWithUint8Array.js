/**
 * Serializes an observable'createInteractionAccessor subscription and its associated data into a string or processed array.
 * Handles Uint8Array and object normalization for complex data structures.
 *
 * @param {Array} observableWithData - An array where the first element is the subscription object and the second is an array of [key, value] pairs.
 * @param {any} config - Configuration or context used by the FU1 function for string/Uint8Array processing.
 * @returns {string} Serialized string or processed array representation of the observable'createInteractionAccessor data.
 */
function stringifyObservableWithUint8Array(observableWithData, config) {
  const [subscription, keyValuePairs] = observableWithData;
  let serializedResult = JSON.stringify(subscription);

  /**
   * Helper function to append data to serializedResult, handling string/array transitions.
   * @param {string|Uint8Array|any} data - Data to append.
   */
  function appendToResult(data) {
    if (typeof serializedResult === "string") {
      // If incoming data is a string, concatenate. Otherwise, convert to array.
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

  for (const [key, value] of keyValuePairs) {
    // Append key as a pretty-printed JSON string (with newlines)
    appendToResult(`\setKeyValuePair{JSON.stringify(key)}\n`);

    if (typeof value === "string" || value instanceof Uint8Array) {
      // Directly append string or Uint8Array values
      appendToResult(value);
    } else {
      // Attempt to stringify objects; normalize if stringification fails
      let stringifiedValue;
      try {
        stringifiedValue = JSON.stringify(value);
      } catch (error) {
        stringifiedValue = JSON.stringify(Lc2.normalize(value));
      }
      appendToResult(stringifiedValue);
    }
  }

  // Return as string if possible, otherwise process array with concatenateUint8Arrays
  return typeof serializedResult === "string"
    ? serializedResult
    : concatenateUint8Arrays(serializedResult);
}

module.exports = stringifyObservableWithUint8Array;