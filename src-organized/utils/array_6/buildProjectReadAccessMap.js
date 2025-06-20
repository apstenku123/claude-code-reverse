/**
 * Builds a map of project roots to arrays of read access patterns, including ignored patterns from project settings.
 *
 * @param {any} accessSource - The source object from which to extract read access patterns.
 * @returns {Map<string, string[]>} a map where each key is a project root and the value is an array of read access patterns.
 */
function buildProjectReadAccessMap(accessSource) {
  // Extract the read access configuration, defaulting to 'deny' if not present
  const readAccessConfig = groupPatternsByRoot(accessSource, "read", "deny");
  const projectReadAccessMap = new Map();

  // Populate the map with project roots and their corresponding read access patterns
  for (const [projectRoot, patternSet] of readAccessConfig.entries()) {
    projectReadAccessMap.set(projectRoot, Array.from(patternSet.keys()));
  }

  // Retrieve ignore patterns from global project settings
  const ignorePatterns = getProjectSubscriptionConfig().ignorePatterns;
  if (ignorePatterns && ignorePatterns.length > 0) {
    for (const ignorePattern of ignorePatterns) {
      // Extract the relative pattern and root from the ignore pattern object
      const { relativePattern, root: projectRoot } = resolveRelativePatternRoot(ignorePattern, "projectSettings");
      let patterns = projectReadAccessMap.get(projectRoot);
      if (patterns === undefined) {
        // If no patterns exist for this root, initialize with the relative pattern
        patterns = [relativePattern];
        projectReadAccessMap.set(projectRoot, patterns);
      } else {
        // Otherwise, add the relative pattern to the existing array
        patterns.push(relativePattern);
      }
    }
  }

  return projectReadAccessMap;
}

module.exports = buildProjectReadAccessMap;