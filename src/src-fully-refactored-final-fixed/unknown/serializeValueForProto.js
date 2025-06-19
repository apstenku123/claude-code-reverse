/**
 * Serializes a JavaScript value into a protocol buffer-compatible object.
 * Handles strings, numbers (int/double), booleans, Uint8Array (bytes), arrays, and objects.
 *
 * @param {any} value - The value to serialize.
 * @returns {object} An object with a single key indicating the type and the serialized value.
 */
function serializeValueForProto(value) {
  const valueType = typeof value;

  // Handle string values
  if (valueType === "string") {
    return { stringValue: value };
  }

  // Handle number values (int or double)
  if (valueType === "number") {
    if (!Number.isInteger(value)) {
      return { doubleValue: value };
    }
    return { intValue: value };
  }

  // Handle boolean values
  if (valueType === "boolean") {
    return { boolValue: value };
  }

  // Handle Uint8Array (bytes)
  if (value instanceof Uint8Array) {
    return { bytesValue: value };
  }

  // Handle arrays (recursively serialize each element)
  if (Array.isArray(value)) {
    return {
      arrayValue: {
        values: value.map(serializeValueForProto)
      }
    };
  }

  // Handle plain objects (serialize each key-value pair)
  if (valueType === "object" && value != null) {
    return {
      kvlistValue: {
        values: Object.entries(value).map(([key, entryValue]) => createKeyValueEntry(key, entryValue))
      }
    };
  }

  // Return empty object for unsupported types (e.g., null, undefined, functions)
  return {};
}

module.exports = serializeValueForProto;