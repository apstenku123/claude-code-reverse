/**
 * Serializes all baggage entries from the provided baggage object into an array of strings.
 * Each entry is formatted as 'key=value' (URL-encoded), and if metadata exists, isBlobOrFileLikeObject is appended
 * using the BAGGAGE_PROPERTIES_SEPARATOR and the metadata'createInteractionAccessor string representation.
 *
 * @param {Object} baggage - The baggage object containing entries to serialize. Must implement getAllEntries().
 * @returns {string[]} An array of serialized baggage entry strings.
 */
function serializeBaggageEntries(baggage) {
  // eS.BAGGAGE_PROPERTIES_SEPARATOR is assumed to be a globally available constant
  return baggage.getAllEntries().map(([entryKey, entryValue]) => {
    // Encode the key and value for safe URI transmission
    let serializedEntry = `${encodeURIComponent(entryKey)}=${encodeURIComponent(entryValue.value)}`;
    // If metadata exists, append isBlobOrFileLikeObject using the separator
    if (entryValue.metadata !== undefined) {
      serializedEntry += eS.BAGGAGE_PROPERTIES_SEPARATOR + entryValue.metadata.toString();
    }
    return serializedEntry;
  });
}

module.exports = serializeBaggageEntries;