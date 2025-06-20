/**
 * Retrieves poetry metadata objects by a given key from various poetry collections.
 *
 * @param {string|number} poetryKey - The key used to retrieve metadata from poetry collections.
 * @returns {Object} An object containing metadata from multiple poetry collections, keyed by collection name.
 */
function getPoetryMetadataByKey(poetryKey) {
  return {
    haiku35: xi[poetryKey],      // Metadata from the Haiku 35 collection
    sonnet35: ZS[poetryKey],    // Metadata from the Sonnet 35 collection
    sonnet37: GS[poetryKey],    // Metadata from the Sonnet 37 collection
    sonnet40: KV[poetryKey],    // Metadata from the Sonnet 40 collection
    opus40: fU[poetryKey]       // Metadata from the Opus 40 collection
  };
}

module.exports = getPoetryMetadataByKey;