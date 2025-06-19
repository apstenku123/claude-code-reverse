/**
 * Builds a map of project roots to their associated read patterns, including ignored patterns from project settings.
 *
 * @param {any} inputObject - The source object containing project read patterns.
 * @returns {Map<string, string[]>} Map where each key is a project root and each value is an array of read patterns.
 */
function buildProjectReadPatternsMap(inputObject) {
  // Retrieve the read patterns configuration for the input object
  const readPatternsConfig = groupPatternsByRoot(inputObject, "read", "deny");
  const projectRootToPatternsMap = new Map();

  // Populate the map with existing read patterns
  for (const [projectRoot, patternSet] of readPatternsConfig.entries()) {
    // Convert the set of patterns to an array for easier manipulation
    projectRootToPatternsMap.set(projectRoot, Array.from(patternSet.keys()));
  }

  // Retrieve ignore patterns from global project settings
  const ignorePatterns = getProjectSubscriptionConfig().ignorePatterns;
  if (ignorePatterns && ignorePatterns.length > 0) {
    for (const ignorePattern of ignorePatterns) {
      // Extract the relative pattern and root from the ignore pattern object
      const { relativePattern, root: projectRoot } = resolveRelativePatternRoot(ignorePattern, "projectSettings");
      let patternsForRoot = projectRootToPatternsMap.get(projectRoot);
      if (patternsForRoot === undefined) {
        // If no patterns exist for this root, initialize with the relative pattern
        patternsForRoot = [relativePattern];
        projectRootToPatternsMap.set(projectRoot, patternsForRoot);
      } else {
        // Otherwise, add the relative pattern to the existing array
        patternsForRoot.push(relativePattern);
      }
    }
  }

  return projectRootToPatternsMap;
}

module.exports = buildProjectReadPatternsMap;