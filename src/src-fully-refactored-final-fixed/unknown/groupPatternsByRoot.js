/**
 * Groups pattern sources by their root directory, based on the provided mode.
 *
 * Depending on the mode ("edit" or "read"), selects a pattern extractor,
 * processes the source observable, and organizes the resulting patterns
 * into a nested Map structure: Map<root, Map<relativePattern, patternSource>>.
 *
 * @param {any} sourceObservable - The observable or iterable source of patterns.
 * @param {string} mode - The mode of operation, either "edit" or "read".
 * @param {any} subscription - Additional subscription or configuration object.
 * @returns {Map<string, Map<string, any>>} - a map where each key is a root directory, and each value is a map of relative patterns to their pattern sources.
 */
function groupPatternsByRoot(sourceObservable, mode, subscription) {
  // Select the pattern extractor function based on the mode
  const patternExtractor = (() => {
    switch (mode) {
      case "edit":
        return _U; // _U is the pattern extractor for edit mode
      case "read":
        return ND; // ND is the pattern extractor for read mode
      default:
        throw new Error(`Unknown mode: ${mode}`);
    }
  })();

  // Extract the patterns using the selected extractor
  const extractedPatterns = getRulesByToolNameAndBehavior(sourceObservable, patternExtractor, subscription);

  // Initialize the result map: Map<root, Map<relativePattern, patternSource>>
  const patternsByRoot = new Map();

  // Iterate through all extracted patterns
  for (const [patternKey, patternSource] of extractedPatterns.entries()) {
    // Destructure the result of resolveRelativePatternRoot to get relativePattern and root
    const { relativePattern, root } = resolveRelativePatternRoot(patternKey, patternSource.source);

    // Retrieve or initialize the map for this root
    let patternsForRoot = patternsByRoot.get(root);
    if (patternsForRoot === undefined) {
      patternsForRoot = new Map();
      patternsByRoot.set(root, patternsForRoot);
    }

    // Map the relative pattern to its pattern source
    patternsForRoot.set(relativePattern, patternSource);
  }

  return patternsByRoot;
}

module.exports = groupPatternsByRoot;