/**
 * Registers a regular expression pattern and its expanded version, associating them with a unique updateSnapshotAndNotify and storing them in global maps for later retrieval and use.
 *
 * @param {string} patternKey - The key or identifier for the pattern (used as a map key).
 * @param {string} pattern - The regular expression pattern to register.
 * @param {boolean} isGlobal - If true, creates global RegExp instances (with 'g' flag); otherwise, creates non-global RegExp instances.
 * @returns {void}
 */
function registerRegexPattern(patternKey, pattern, isGlobal) {
  // Expand shorthand quantifiers in the pattern (e.g., '*' and '+')
  const expandedPattern = expandRegexQuantifiers(pattern);

  // Generate a unique numeric updateSnapshotAndNotify for this pattern
  const patternId = nextPatternId++;

  // Store the pattern and its updateSnapshotAndNotify in global maps for quick lookup
  associatePatternWithId(patternKey, patternId, pattern);
  patternKeyToIdMap[patternKey] = patternId;
  idToPatternMap[patternId] = pattern;
  expandedPatternMap[patternId] = expandedPattern;

  // Create RegExp instances for both the original and expanded patterns
  // Use the 'g' flag if isGlobal is true, otherwise no flag
  originalPatternRegexMap[patternId] = new RegExp(pattern, isGlobal ? 'g' : undefined);
  expandedPatternRegexMap[patternId] = new RegExp(expandedPattern, isGlobal ? 'g' : undefined);
}

module.exports = registerRegexPattern;