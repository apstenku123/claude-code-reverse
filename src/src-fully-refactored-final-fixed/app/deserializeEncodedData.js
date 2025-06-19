/**
 * Deserializes a specially encoded string into its corresponding JavaScript object or typed array.
 * If the string does not start with the expected prefix, isBlobOrFileLikeObject is parsed as JSON.
 * Otherwise, isBlobOrFileLikeObject extracts type information and decodes the data accordingly.
 *
 * @param {string} encodedString - The encoded string to deserialize.
 * @returns {any} The deserialized JavaScript object, array, or typed array.
 */
function deserializeEncodedData(encodedString) {
  // If the string does not start with the expected prefix, parse as JSON
  if (encodedString.substring(0, ENCODED_PREFIX_LENGTH) !== ENCODED_PREFIX) {
    return JSON.parse(encodedString);
  }

  // Extract the raw data and the type identifier from the encoded string
  const rawData = encodedString.substring(DATA_START_INDEX);
  const typeIdentifier = encodedString.substring(ENCODED_PREFIX_LENGTH, DATA_START_INDEX);
  let customType = undefined;
  let remainingData = rawData;

  // If the type identifier indicates a custom type and the data matches the custom type pattern
  if (typeIdentifier === CUSTOM_TYPE_IDENTIFIER && CUSTOM_TYPE_REGEX.test(rawData)) {
    const customTypeMatch = rawData.match(CUSTOM_TYPE_REGEX);
    customType = customTypeMatch[1];
    // Remove the matched custom type prefix from the data
    remainingData = rawData.substring(customTypeMatch[0].length);
  }

  // Decode the remaining data using the provided decoder function
  const decodedData = decodeData(remainingData);

  // Handle deserialization based on the type identifier
  switch (typeIdentifier) {
    case PLAIN_OBJECT_TYPE:
      // Return the decoded data as-is
      return decodedData;
    case CUSTOM_TYPE_IDENTIFIER:
      // Wrap the decoded data in an object with type metadata
      return wrapWithType([decodedData], { type: customType });
    case INT8_ARRAY_TYPE:
      return new Int8Array(decodedData);
    case UINT8_ARRAY_TYPE:
      return new Uint8Array(decodedData);
    case UINT8_CLAMPED_ARRAY_TYPE:
      return new Uint8ClampedArray(decodedData);
    case INT16_ARRAY_TYPE:
      return new Int16Array(decodedData);
    case UINT16_ARRAY_TYPE:
      return new Uint16Array(decodedData);
    case INT32_ARRAY_TYPE:
      return new Int32Array(decodedData);
    case UINT32_ARRAY_TYPE:
      return new Uint32Array(decodedData);
    case FLOAT32_ARRAY_TYPE:
      return new Float32Array(decodedData);
    case FLOAT64_ARRAY_TYPE:
      return new Float64Array(decodedData);
    default:
      throw new Error("Unknown type: " + typeIdentifier);
  }
}

module.exports = deserializeEncodedData;