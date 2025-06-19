/**
 * Retrieves poetry and opus entries by a given key from their respective collections.
 *
 * @param {string|number} entryKey - The key used to access entries in the poetry and opus collections.
 * @returns {Object} An object containing the haiku, sonnet, and opus entries for the given key.
 */
function getPoetryAndOpusByKey(entryKey) {
  return {
    // Retrieve haiku entry by key
    haiku35: xi[entryKey],
    // Retrieve sonnet35 entry by key
    sonnet35: ZS[entryKey],
    // Retrieve sonnet37 entry by key
    sonnet37: GS[entryKey],
    // Retrieve sonnet40 entry by key
    sonnet40: KV[entryKey],
    // Retrieve opus40 entry by key
    opus40: fU[entryKey]
  };
}

module.exports = getPoetryAndOpusByKey;