/**
 * Searches for a matching ignored pattern in a set of rules and returns its associated value if found.
 *
 * @param {any} sourceObservable - The source observable or context used to determine the base path.
 * @param {any} config - Configuration object containing rules or patterns to check against.
 * @param {any} subscription - Subscription or additional data required for rule evaluation.
 * @param {any} defaultPathProvider - Function or value to provide a default path if none is specified.
 * @returns {any} The value associated with the first matching ignored pattern, or null if none is found.
 */
function getMatchingIgnoredPatternValue(sourceObservable, config, subscription, defaultPathProvider) {
  // Compute the base path from the source observable
  const basePath = f3(sourceObservable);
  // Generate the rules map using the provided config, subscription, and default path provider
  const rulesMap = groupPatternsByRoot(config, subscription, defaultPathProvider);

  // Iterate over each rule entry in the rules map
  for (const [ruleKey, ruleSet] of rulesMap.entries()) {
    // Create a pattern matcher using the keys from the rule set
    const patternMatcher = VxA.default().add(Array.from(ruleSet.keys()));
    // Compute the relative path between the rule key and the base path
    const relativePath = Wv.relative(ruleKey ?? iA(), basePath);

    // Skip if the relative path starts with the ignored prefix or is falsy
    if (relativePath.startsWith(`..${jU}`)) continue;
    if (!relativePath) continue;

    // Test the relative path against the pattern matcher
    const matchResult = patternMatcher.test(relativePath);
    // If the path is ignored and a matching rule exists, return the associated value
    if (matchResult.ignored && matchResult.rule) {
      return ruleSet.get(matchResult.rule.pattern) ?? null;
    }
  }

  // Return null if no matching ignored pattern is found
  return null;
}

module.exports = getMatchingIgnoredPatternValue;