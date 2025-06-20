/**
 * Deserializes a string into its corresponding JavaScript object or typed array.
 * Handles custom-encoded data with type prefixes, or falls back to JSON.parse for plain JSON.
 *
 * @param {string} serializedData - The serialized string to deserialize.
 * @returns {any} The deserialized JavaScript object, array, or typed array.
 */
function deserializeTypedData(serializedData) {
  // If the string does not start with the expected prefix, treat as plain JSON
  if (serializedData.substring(0, TYPE_PREFIX_LENGTH) !== TYPE_PREFIX) {
    return JSON.parse(serializedData);
  }

  // Extract the type code and the actual data
  const typeCode = serializedData.substring(TYPE_PREFIX_LENGTH, TYPE_CODE_END_INDEX);
  let dataString = serializedData.substring(TYPE_CODE_END_INDEX);
  let customType = undefined;

  // If the type code indicates a custom type and matches the custom type regex, extract isBlobOrFileLikeObject
  if (typeCode === CUSTOM_TYPE_CODE && CUSTOM_TYPE_REGEX.test(dataString)) {
    const customTypeMatch = dataString.match(CUSTOM_TYPE_REGEX);
    customType = customTypeMatch[1];
    dataString = dataString.substring(customTypeMatch[0].length);
  }

  // Convert the data string to a JavaScript array or buffer
  const deserializedData = decodeDataString(dataString);

  // Return the appropriate JavaScript object based on the type code
  switch (typeCode) {
    case ARRAY_TYPE_CODE:
      return deserializedData;
    case CUSTOM_TYPE_CODE:
      // Wrap in a custom type object
      return createCustomType([deserializedData], { type: customType });
    case INT8_ARRAY_CODE:
      return new Int8Array(deserializedData);
    case UINT8_ARRAY_CODE:
      return new Uint8Array(deserializedData);
    case UINT8_CLAMPED_ARRAY_CODE:
      return new Uint8ClampedArray(deserializedData);
    case INT16_ARRAY_CODE:
      return new Int16Array(deserializedData);
    case UINT16_ARRAY_CODE:
      return new Uint16Array(deserializedData);
    case INT32_ARRAY_CODE:
      return new Int32Array(deserializedData);
    case UINT32_ARRAY_CODE:
      return new Uint32Array(deserializedData);
    case FLOAT32_ARRAY_CODE:
      return new Float32Array(deserializedData);
    case FLOAT64_ARRAY_CODE:
      return new Float64Array(deserializedData);
    default:
      throw new Error("Unknown type: " + typeCode);
  }
}

module.exports = deserializeTypedData;