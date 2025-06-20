/**
 * Finds the first 'always allow' rule behavior for a given configuration from the provided source observable.
 *
 * @param {Observable} sourceObservable - The observable source containing configurations and their rule behaviors.
 * @param {Object} config - The configuration object to match against the rule behaviors.
 * @returns {Object|null} The first matching 'always allow' rule behavior object, or null if none is found.
 */
function findMatchingAlwaysAllowRuleBehavior(sourceObservable, config) {
  // Retrieve all 'always allow' rule behaviors from the source observable
  const alwaysAllowRuleBehaviors = getAlwaysAllowRuleBehaviors(sourceObservable);

  // Find the first rule behavior that matches the provided configuration
  const matchingRuleBehavior = alwaysAllowRuleBehaviors.find(
    (ruleBehavior) => isRuleContentUndefinedOrMatchingTool(config, ruleBehavior)
  );

  // Return the matching rule behavior, or null if none is found
  return matchingRuleBehavior || null;
}

module.exports = findMatchingAlwaysAllowRuleBehavior;