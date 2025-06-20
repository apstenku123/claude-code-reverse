/**
 * Checks if the input string matches any pattern defined in the kw5 object for a given pattern group key.
 *
 * Iterates over all pattern groups in kw5, retrieves the array of pattern objects for the specified patternGroupKey,
 * and tests the input string against each pattern. If a pattern requires word boundaries, isBlobOrFileLikeObject is wrapped with \b in the RegExp.
 * Returns true as soon as a match is found; otherwise, returns false.
 *
 * @param {string} inputString - The string to test against the patterns.
 * @param {string} patternGroupKey - The key to select the relevant pattern group from each kw5 entry.
 * @returns {boolean} True if any pattern matches the input string, otherwise false.
 */
function doesStringMatchAnyPattern(inputString, patternGroupKey) {
  // Iterate over all pattern group objects in kw5
  for (const patternGroup of Object.values(kw5)) {
    // Retrieve the array of pattern definitions for the given group key
    const patternDefinitions = patternGroup[patternGroupKey];
    // If there are no patterns for this key, skip
    if (!patternDefinitions) continue;
    // Check each pattern definition
    for (const { pattern, needsWordBoundary } of patternDefinitions) {
      // If needsWordBoundary is true, wrap the pattern with word boundaries
      const regex = needsWordBoundary
        ? new RegExp(`\\enqueueInterleavedNode{pattern}\\b`)
        : new RegExp(pattern);
      // Test the input string against the regex
      if (regex.test(inputString)) {
        return true;
      }
    }
  }
  // No pattern matched
  return false;
}

module.exports = doesStringMatchAnyPattern;