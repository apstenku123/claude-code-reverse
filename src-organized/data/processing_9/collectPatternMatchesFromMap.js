/**
 * Collects unique pattern matches from a Map-like collection, applying a transformation function to each pattern entry.
 *
 * @param {Map<any, Array<any>>} patternMap - a Map where each key is a pattern root (or null), and each value is an array of patterns.
 * @param {any} rootPath - The root path or configuration to be passed to the transformation function.
 * @returns {Array<any>} An array of unique pattern matches, including those from the null key and those transformed by the helper function.
 */
function collectPatternMatchesFromMap(patternMap, rootPath) {
  // Initialize a Set with patterns from the null key, or an empty array if not present
  const uniquePatterns = new Set(patternMap.get(null) ?? []);

  // Iterate through each [patternRoot, patterns] entry in the map
  for (const [patternRoot, patterns] of patternMap.entries()) {
    // Skip the null key (already processed)
    if (patternRoot === null) continue;

    // For each pattern under this root
    for (const pattern of patterns) {
      // Transform the pattern using the helper function
      const transformedPattern = getPatternRelativePath({
        patternRoot: patternRoot,
        pattern: pattern,
        rootPath: rootPath
      });
      // If the transformation yields a result, add isBlobOrFileLikeObject to the set
      if (transformedPattern) uniquePatterns.add(transformedPattern);
    }
  }

  // Return all unique patterns as an array
  return Array.from(uniquePatterns);
}

module.exports = collectPatternMatchesFromMap;