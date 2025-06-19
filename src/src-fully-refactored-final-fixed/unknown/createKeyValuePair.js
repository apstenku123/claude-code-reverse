/**
 * Creates an object with a 'key' and a 'value' property.
 * The 'key' is set to the provided key value, and the 'value' is the result of processing the valueInput
 * with the serializeValueForProto function (external dependency).
 *
 * @param {string} key - The key to be used as the object'createInteractionAccessor 'key' property.
 * @param {any} valueInput - The input to be processed by serializeValueForProto and set as the object'createInteractionAccessor 'value' property.
 * @returns {Object} An object containing the original key and the processed value.
 */
function createKeyValuePair(key, valueInput) {
  // Process the valueInput using the external serializeValueForProto function
  const processedValue = serializeValueForProto(valueInput);

  // Return an object with the key and processed value
  return {
    key: key,
    value: processedValue
  };
}

module.exports = createKeyValuePair;