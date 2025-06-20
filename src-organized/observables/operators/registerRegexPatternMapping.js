/**
 * Registers a regex pattern mapping and its expanded form, along with associated metadata and compiled RegExp objects.
 *
 * @param {string} patternKey - The unique key or identifier for the pattern mapping.
 * @param {string} regexPattern - The regex pattern string to be mapped and expanded.
 * @param {boolean} useGlobalFlag - Whether to compile the regex with the global ('g') flag.
 * @returns {void}
 *
 * This function:
 *   - Expands the provided regex pattern using expandRegexQuantifiers.
 *   - Generates a unique numeric mapping key (auto-incremented).
 *   - Stores the mapping between patternKey and mappingKey.
 *   - Stores the original and expanded regex patterns in mapping tables.
 *   - Compiles and stores RegExp objects for both the original and expanded patterns, with or without the global flag.
 */
function registerRegexPatternMapping(patternKey, regexPattern, useGlobalFlag) {
  // Expand the regex pattern using custom quantifier expansion logic
  const expandedPattern = expandRegexQuantifiers(regexPattern);

  // Generate a unique numeric mapping key
  const mappingKey = nextMappingKey++;

  // Register the mapping between the patternKey and mappingKey
  mapPatternKeyToMappingKey(patternKey, mappingKey, regexPattern);
  patternKeyToMappingKey[patternKey] = mappingKey;
  mappingKeyToPattern[mappingKey] = regexPattern;

  // Store the expanded pattern for this mapping
  expandedPatternByMappingKey[mappingKey] = expandedPattern;

  // Compile and store RegExp objects for both the original and expanded patterns
  compiledPatternByMappingKey[mappingKey] = new RegExp(
    regexPattern,
    useGlobalFlag ? "g" : undefined
  );
  compiledExpandedPatternByMappingKey[mappingKey] = new RegExp(
    expandedPattern,
    useGlobalFlag ? "g" : undefined
  );
}

module.exports = registerRegexPatternMapping;