/**
 * Retrieves matching 'deny' and 'allow' rules for a given source observable, configuration, and subscription.
 *
 * @param {Observable} sourceObservable - The observable or data source to evaluate rules against.
 * @param {Object} config - The configuration object containing rule definitions.
 * @param {Object} subscription - The subscription or context used for rule evaluation.
 * @returns {Object} An object containing arrays of matching deny and allow rules.
 */
function getMatchingAllowAndDenyRules(sourceObservable, config, subscription) {
  // Extract all 'deny' rules from the configuration
  const denyRules = processObservableWithConfig(config, P4, "deny");
  // Find all deny rules that match the source observable and subscription
  const matchingDenyRules = jz2(sourceObservable, denyRules, subscription);

  // Extract all 'allow' rules from the configuration
  const allowRules = processObservableWithConfig(config, P4, "allow");
  // Find all allow rules that match the source observable and subscription
  const matchingAllowRules = jz2(sourceObservable, allowRules, subscription);

  return {
    matchingDenyRules,
    matchingAllowRules
  };
}

module.exports = getMatchingAllowAndDenyRules;