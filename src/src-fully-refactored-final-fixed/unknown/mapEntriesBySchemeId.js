/**
 * Maps an array of entries to a Map using each entry'createInteractionAccessor `schemeId` as the key.
 *
 * @param {Array<Object>} entries - Array of objects, each containing a `schemeId` property.
 * @returns {Map<any, Object>} a Map where each key is a `schemeId` and each value is the corresponding entry object.
 */
function mapEntriesBySchemeId(entries) {
  // Initialize a new Map to store entries by their schemeId
  const entriesBySchemeId = new Map();

  // Iterate over each entry in the input array
  for (const entry of entries) {
    // Use the schemeId as the key and the entry object as the value
    entriesBySchemeId.set(entry.schemeId, entry);
  }

  // Return the populated Map
  return entriesBySchemeId;
}

module.exports = mapEntriesBySchemeId;