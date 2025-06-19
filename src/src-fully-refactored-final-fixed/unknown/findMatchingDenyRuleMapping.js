/**
 * Searches for a deny rule mapping associated with the given configuration.
 * Utilizes the getAlwaysDenyRuleMappings function to retrieve all deny rule mappings
 * from the provided sourceObservable, then finds the first mapping that matches
 * the provided config using the isRuleContentUndefinedOrMatchingTool comparison function.
 *
 * @param {Object} sourceObservable - The observable source containing deny rule configurations.
 * @param {Object} config - The configuration object to match against deny rule mappings.
 * @returns {Object|null} The first matching deny rule mapping, or null if none found.
 */
function findMatchingDenyRuleMapping(sourceObservable, config) {
  // Retrieve all deny rule mappings from the source observable
  const denyRuleMappings = getAlwaysDenyRuleMappings(sourceObservable);

  // Find the first mapping that matches the provided config using isRuleContentUndefinedOrMatchingTool
  const matchingMapping = denyRuleMappings.find(subscription => isRuleContentUndefinedOrMatchingTool(config, subscription));

  // Return the matching mapping, or null if none found
  return matchingMapping || null;
}

module.exports = findMatchingDenyRuleMapping;