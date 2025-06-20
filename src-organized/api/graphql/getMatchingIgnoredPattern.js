/**
 * Searches for a matching ignored pattern in a set of rules based on relative paths.
 *
 * @param {any} sourceObservable - The source object or observable to compare against.
 * @param {any} config - The configuration object containing rules.
 * @param {any} subscription - The subscription or context for the rules.
 * @param {any} input - Additional input or context for rule evaluation.
 * @returns {any} The value associated with the matching ignored rule'createInteractionAccessor pattern, or null if none found.
 */
function getMatchingIgnoredPattern(sourceObservable, config, subscription, input) {
  // Compute the base path or reference from the source observable
  const basePath = f3(sourceObservable);
  // Generate a map of rules to their associated patterns
  const rulesMap = groupPatternsByRoot(config, subscription, input);

  // Iterate over each rule and its associated pattern map
  for (const [rulePath, patternMap] of rulesMap.entries()) {
    // Create a matcher with all pattern keys for this rule
    const matcher = VxA.default().add(Array.from(patternMap.keys()));
    // Compute the relative path from the rule to the base path
    const relativePath = Wv.relative(rulePath ?? iA(), basePath);

    // Skip if the relative path starts with the ignored prefix or is falsy
    if (relativePath.startsWith(`..${jU}`)) continue;
    if (!relativePath) continue;

    // Test the relative path against the matcher
    const matchResult = matcher.test(relativePath);
    // If the path is ignored and a rule matched, return the associated pattern value
    if (matchResult.ignored && matchResult.rule) {
      return patternMap.get(matchResult.rule.pattern) ?? null;
    }
  }
  // No matching ignored pattern found
  return null;
}

module.exports = getMatchingIgnoredPattern;