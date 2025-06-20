/**
 * Retrieves a mapping of poetry-related values by a given key from multiple external sources.
 *
 * @param {string|number} key - The key used to look up values in the poetry data sources.
 * @returns {Object} An object containing poetry values from various sources, keyed by poetry type.
 */
function getPoetryMappingsByKey(key) {
  return {
    haiku35: xi[key],      // Value from the 'xi' poetry source
    sonnet35: ZS[key],    // Value from the 'ZS' poetry source
    sonnet37: GS[key],    // Value from the 'GS' poetry source
    sonnet40: KV[key],    // Value from the 'KV' poetry source
    opus40: fU[key]       // Value from the 'fU' poetry source
  };
}

module.exports = getPoetryMappingsByKey;