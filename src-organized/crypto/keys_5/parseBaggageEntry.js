/**
 * Parses a baggage entry string into its key, value, and optional metadata.
 *
 * The input string is expected to be in the format:
 *   key<keyValueSeparator>value[<propertySeparator>metadata...]
 *
 * Example:
 *   "userId=123;meta1:value1;meta2:value2"
 *
 * @param {string} baggageEntryString - The baggage entry string to parse.
 * @returns {{ key: string, value: string, metadata?: any }|undefined} An object with key, value, and optional metadata, or undefined if parsing fails.
 */
function parseBaggageEntry(baggageEntryString) {
  // Split the input string by the baggage properties separator (e.g., ';')
  const entryParts = baggageEntryString.split(eS.BAGGAGE_PROPERTIES_SEPARATOR);
  if (entryParts.length <= 0) return;

  // The first part should be the key-value pair
  const keyValuePair = entryParts.shift();
  if (!keyValuePair) return;

  // Find the separator between key and value (e.g., '=')
  const keyValueSeparatorIndex = keyValuePair.indexOf(eS.BAGGAGE_KEY_PAIR_SEPARATOR);
  if (keyValueSeparatorIndex <= 0) return;

  // Extract and decode the key and value
  const key = decodeURIComponent(keyValuePair.substring(0, keyValueSeparatorIndex).trim());
  const value = decodeURIComponent(keyValuePair.substring(keyValueSeparatorIndex + 1).trim());

  let metadata;
  // If there are additional parts, treat them as metadata
  if (entryParts.length > 0) {
    metadata = yg4.baggageEntryMetadataFromString(entryParts.join(eS.BAGGAGE_PROPERTIES_SEPARATOR));
  }

  return {
    key,
    value,
    metadata
  };
}

module.exports = parseBaggageEntry;