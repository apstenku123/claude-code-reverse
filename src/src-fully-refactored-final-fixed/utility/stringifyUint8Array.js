/**
 * Serializes an array of key-value pairs, where values can be strings, Uint8Arrays, or objects, into a string or a processed array.
 * Handles special cases for Uint8Array and objects that may not be directly serializable.
 *
 * @param {Array} keyValuePairsAndValues - An array where the first element is an array of key-value pairs, and the second is an array of values.
 * @param {any} encodingConfig - Configuration or encoding parameter used by FU1 function.
 * @returns {string} The serialized representation of the input, or a processed array if required.
 */
function stringifyInteractionEntriesWithConfig(keyValuePairsAndValues, encodingConfig) {
  const [keyValuePairs, values] = keyValuePairsAndValues;
  let serializedResult = JSON.stringify(keyValuePairs);

  /**
   * Helper function to append data to the serializedResult, handling strings and arrays.
   * @param {string|Uint8Array|object} data - The data to append.
   */
  function appendToResult(data) {
    if (typeof serializedResult === "string") {
      // If current result is a string, append directly or convert to array
      serializedResult = typeof data === "string"
        ? serializedResult + data
        : [FU1(serializedResult, encodingConfig), data];
    } else {
      // If already an array, push processed data
      serializedResult.push(
        typeof data === "string" ? FU1(data, encodingConfig) : data
      );
    }
  }

  for (const valueEntry of values) {
    const [key, value] = valueEntry;
    // Append the key as a pretty-printed JSON string (with newline)
    appendToResult(`\setKeyValuePair{JSON.stringify(key)}\n`);

    if (typeof value === "string" || value instanceof Uint8Array) {
      // Directly append strings or Uint8Arrays
      appendToResult(value);
    } else {
      // Attempt to stringify objects, normalizing if necessary
      let valueStringified;
      try {
        valueStringified = JSON.stringify(value);
      } catch (error) {
        valueStringified = JSON.stringify(Lc2.normalize(value));
      }
      appendToResult(valueStringified);
    }
  }

  // Return as string if possible, otherwise process with concatenateUint8Arrays
  return typeof serializedResult === "string"
    ? serializedResult
    : concatenateUint8Arrays(serializedResult);
}

module.exports = stringifyInteractionEntriesWithConfig;