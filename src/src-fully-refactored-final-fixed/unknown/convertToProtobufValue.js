/**
 * Converts a JavaScript value to a Protobuf-compatible value object.
 * Handles strings, numbers (int/double), booleans, Uint8Array (bytes), arrays, and objects.
 *
 * @param {any} value - The value to convert to a Protobuf value representation.
 * @returns {object} An object representing the value in Protobuf format.
 */
function convertToProtobufValue(value) {
  const valueType = typeof value;

  // Handle string values
  if (valueType === "string") {
    return { stringValue: value };
  }

  // Handle number values (int or double)
  if (valueType === "number") {
    if (!Number.isInteger(value)) {
      // Non-integer numbers are treated as doubles
      return { doubleValue: value };
    }
    // Integers are treated as intValue
    return { intValue: value };
  }

  // Handle boolean values
  if (valueType === "boolean") {
    return { boolValue: value };
  }

  // Handle binary data (Uint8Array)
  if (value instanceof Uint8Array) {
    return { bytesValue: value };
  }

  // Handle arrays recursively
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(convertToProtobufValue)
      }
    };
  }

  // Handle objects (excluding null)
  if (valueType === "object" && value != null) {
    return {
      kvlistValue: {
        values: Object.entries(value).map(([key, entryValue]) => createKeyValueEntry(key, entryValue))
      }
    };
  }

  // Return empty object for unsupported types (e.g., undefined, null)
  return {};
}

module.exports = convertToProtobufValue;