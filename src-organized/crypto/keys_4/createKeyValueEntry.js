/**
 * Creates a key-value entry object using the provided key and value.
 * The value is processed using the serializeValueForProto function before assignment.
 *
 * @param {string} key - The key for the entry.
 * @param {any} value - The value to be processed and stored in the entry.
 * @returns {{ key: string, value: any }} An object containing the key and the processed value.
 */
function createKeyValueEntry(key, value) {
  // Process the value using the external serializeValueForProto function before assignment
  return {
    key: key,
    value: serializeValueForProto(value)
  };
}

module.exports = createKeyValueEntry;