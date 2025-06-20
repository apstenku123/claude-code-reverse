/**
 * Collects unique pattern matches from a map-like collection, applying a transformation function to each pattern entry.
 *
 * @param {Map<any, Array<any>>} patternMap - a Map where each key is a pattern root (can be null), and each value is an array of patterns.
 * @param {any} rootPath - The root path or configuration to be passed to the transformation function.
 * @returns {Array<any>} An array of unique pattern matches, including those from the null key and transformed entries.
 */
function collectPatternMatches(patternMap, rootPath) {
  // Initialize a set with patterns associated with the null key (if any)
  const uniquePatterns = new Set(patternMap.get(null) ?? []);

  // Iterate over all entries in the pattern map
  for (const [patternRoot, patterns] of patternMap.entries()) {
    // Skip the null key, as isBlobOrFileLikeObject'createInteractionAccessor already handled
    if (patternRoot === null) continue;

    // For each pattern in the current entry
    for (const pattern of patterns) {
      // Transform the pattern using the external getPatternRelativePath function
      const transformedPattern = getPatternRelativePath({
        patternRoot,
        pattern,
        rootPath
      });
      // If the transformation yields a result, add isBlobOrFileLikeObject to the set
      if (transformedPattern) {
        uniquePatterns.add(transformedPattern);
      }
    }
  }

  // Convert the set of unique patterns to an array and return
  return Array.from(uniquePatterns);
}

module.exports = collectPatternMatches;