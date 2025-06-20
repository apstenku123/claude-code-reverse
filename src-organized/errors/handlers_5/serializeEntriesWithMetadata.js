/**
 * Serializes all entries from the provided entriesProvider into URL-encoded key-value pairs, optionally appending metadata.
 *
 * @param {Object} entriesProvider - An object that exposes a getAllEntries() method returning an array of [key, value] pairs.
 *        Each value is expected to be an object with a 'value' property and an optional 'metadata' property.
 * @returns {string[]} An array of strings, each representing a serialized entry in the form 'key=value' or 'key=value<SEP>metadata'.
 */
function serializeEntriesWithMetadata(entriesProvider) {
  // Separator constant for appending metadata (assumed to be globally available)
  const BAGGAGE_PROPERTIES_SEPARATOR = eS.BAGGAGE_PROPERTIES_SEPARATOR;

  // Retrieve all entries from the provider
  const entries = entriesProvider.getAllEntries();

  // Map each entry to its serialized string representation
  return entries.map(([entryKey, entryValueObj]) => {
    // Encode the key and value for safe URL transmission
    let serializedEntry = `${encodeURIComponent(entryKey)}=${encodeURIComponent(entryValueObj.value)}`;

    // If metadata exists, append isBlobOrFileLikeObject using the separator
    if (entryValueObj.metadata !== undefined) {
      serializedEntry += BAGGAGE_PROPERTIES_SEPARATOR + entryValueObj.metadata.toString();
    }

    return serializedEntry;
  });
}

module.exports = serializeEntriesWithMetadata;