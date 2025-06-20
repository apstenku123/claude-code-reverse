/**
 * Finds and returns the first 'always deny' rule detail for a given configuration that matches a specific condition.
 *
 * @param {object} sourceObservable - The source observable or context from which to extract 'always deny' rule details.
 * @param {object} config - The configuration object to match against the rule details.
 * @returns {object|null} The first matching 'always deny' rule detail object, or null if none match.
 */
function findMatchingAlwaysDenyRuleDetail(sourceObservable, config) {
  // Retrieve all 'always deny' rule details for the given source
  const alwaysDenyRuleDetails = getAlwaysDenyRuleDetails(sourceObservable);

  // Find the first rule detail that matches the provided configuration
  const matchingRuleDetail = alwaysDenyRuleDetails.find(
    (ruleDetail) => isRuleContentUndefinedOrMatchingTool(config, ruleDetail)
  );

  // Return the matching rule detail, or null if none found
  return matchingRuleDetail || null;
}

module.exports = findMatchingAlwaysDenyRuleDetail;