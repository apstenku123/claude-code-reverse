/**
 * Iterates over a set of rules and their associated maps to find the first ignored rule
 * that matches a relative path derived from the provided source observable. If such a rule is found,
 * returns the corresponding value from the map; otherwise, returns null.
 *
 * @param {any} sourceObservable - The source observable or context for relative path calculation.
 * @param {any} config - Configuration object used to generate rule maps.
 * @param {any} subscription - Subscription or context used in rule map generation.
 * @param {any} defaultInput - Default input used if a key is missing when calculating relative paths.
 * @returns {any} The value associated with the first matching ignored rule'createInteractionAccessor pattern, or null if none found.
 */
function getMatchingIgnoredRuleValue(sourceObservable, config, subscription, defaultInput) {
  const basePath = f3(sourceObservable); // Compute the base path from the source observable
  const ruleMaps = groupPatternsByRoot(config, subscription, defaultInput); // Generate rule maps from config and subscription

  for (const [ruleKey, ruleMap] of ruleMaps.entries()) {
    // Create a test object with all rule patterns as keys
    const ruleTester = VxA.default().add(Array.from(ruleMap.keys()));
    // Compute the relative path from the rule key to the base path
    const relativePath = Wv.relative(ruleKey ?? iA(), basePath);

    // Skip if the relative path starts with a parent directory indicator or is falsy
    if (relativePath.startsWith(`..${jU}`)) continue;
    if (!relativePath) continue;

    // Test the relative path against the rule tester
    const testResult = ruleTester.test(relativePath);
    // If the path is ignored and a matching rule exists, return the associated value
    if (testResult.ignored && testResult.rule) {
      return ruleMap.get(testResult.rule.pattern) ?? null;
    }
  }
  // No matching ignored rule found
  return null;
}

module.exports = getMatchingIgnoredRuleValue;