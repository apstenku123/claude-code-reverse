/**
 * Processes a rule configuration object and prepares isBlobOrFileLikeObject for further handling.
 *
 * This function takes a configuration object containing a rule property, extracts relevant values,
 * and constructs a new configuration object with normalized properties. It then passes this object
 * to the `updatePermissionContextWithRuleValues` function for further processing.
 *
 * @async
 * @param {Object} ruleConfig - The configuration object containing rule details.
 * @param {Object} ruleConfig.rule - The rule object with value, behavior, and source.
 * @param {*} [ruleConfig.*] - Any additional properties to be included in the final configuration.
 * @returns {Promise<any>} The result of processing the normalized configuration with the `updatePermissionContextWithRuleValues` function.
 */
async function processRuleConfiguration(ruleConfig) {
  // Construct a new configuration object with normalized rule properties
  const normalizedConfig = {
    ...ruleConfig,
    ruleValues: [ruleConfig.rule.ruleValue], // Wrap ruleValue in an array
    ruleBehavior: ruleConfig.rule.ruleBehavior, // Extract ruleBehavior
    destination: ruleConfig.rule.source // Set destination to rule'createInteractionAccessor source
  };

  // Pass the normalized configuration to the updatePermissionContextWithRuleValues function
  return updatePermissionContextWithRuleValues(normalizedConfig);
}

module.exports = processRuleConfiguration;
