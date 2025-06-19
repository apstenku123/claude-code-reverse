/**
 * Updates the project settings by removing a specific permission rule from the context and triggers the provided context setter.
 * Throws an error if attempting to delete rules from managed (policy) settings.
 *
 * @param {Object} options - The options object containing rule information and context handlers.
 * @param {Object} options.rule - The permission rule object to be removed.
 * @param {string} options.rule.source - The source of the rule (e.g., 'localSettings', 'userSettings', etc.).
 * @param {string|number} options.rule.ruleValue - The value of the rule to be removed.
 * @param {string} options.rule.ruleBehavior - The behavior of the rule (e.g., 'allow', 'deny').
 * @param {Object} options.initialContext - The current permission context object.
 * @param {Function} options.setToolPermissionContext - Function to update the permission context.
 * @returns {Promise<void>} This function does not return a value.
 * @throws {Error} If attempting to delete permission rules from managed (policy) settings.
 */
async function setProjectSettings({
  rule,
  initialContext,
  setToolPermissionContext
}) {
  // Prevent deletion from managed settings
  if (rule.source === "policySettings") {
    throw new Error("Cannot delete permission rules from managed settings");
  }

  // Convert the rule value to its internal representation
  const normalizedRuleValue = formatToolNameWithRule(rule.ruleValue);

  // Get the rule type string (e.g., 'allowRules', 'denyRules') based on rule behavior
  const ruleTypeKey = getRuleTypeByPermission(rule.ruleBehavior);

  // The source of the rule (e.g., 'localSettings', 'userSettings', etc.)
  const ruleSource = rule.source;

  // Create a new context with the specified rule removed from the appropriate source
  const updatedContext = {
    ...initialContext,
    [ruleTypeKey]: {
      ...initialContext[ruleTypeKey],
      [ruleSource]: initialContext[ruleTypeKey][ruleSource]?.filter(
        (existingRuleValue) => existingRuleValue !== normalizedRuleValue
      ) || []
    }
  };

  // Handle side effects for certain sources
  switch (ruleSource) {
    case "localSettings":
    case "userSettings":
    case "projectSettings": {
      // Perform any additional cleanup or logging for these sources
      removePermissionFromSource(rule);
      break;
    }
    case "cliArg":
      // No additional action required for CLI arguments
      break;
  }

  // Update the permission context with the new settings
  setToolPermissionContext(updatedContext);
}

module.exports = setProjectSettings;