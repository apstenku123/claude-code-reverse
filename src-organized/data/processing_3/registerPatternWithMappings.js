/**
 * Registers a pattern and its mappings in various lookup tables and creates corresponding regular expressions.
 *
 * @param {string} patternKey - The unique key or identifier for the pattern.
 * @param {string} pattern - The pattern string to be registered.
 * @param {boolean} isGlobal - Whether the regular expressions should have the global flag.
 * @returns {void}
 */
function registerPatternWithMappings(patternKey, pattern, isGlobal) {
  // Generate a transformed version of the pattern (e.g., escaped or modified)
  const transformedPattern = expandRegexQuantifiers(pattern);

  // Generate a unique numeric updateSnapshotAndNotify for this pattern
  const patternId = VM6++;

  // Register the pattern in an external mapping function
  FM6(patternKey, patternId, pattern);

  // Map the patternKey to its numeric updateSnapshotAndNotify
  j2[patternKey] = patternId;

  // Map the numeric updateSnapshotAndNotify to the original pattern
  _2[patternId] = pattern;

  // Map the numeric updateSnapshotAndNotify to the transformed pattern
  CM6[patternId] = transformedPattern;

  // Create a RegExp from the original pattern, with optional global flag
  JM6[patternId] = new RegExp(pattern, isGlobal ? "g" : undefined);

  // Create a RegExp from the transformed pattern, with optional global flag
  XM6[patternId] = new RegExp(transformedPattern, isGlobal ? "g" : undefined);
}

module.exports = registerPatternWithMappings;