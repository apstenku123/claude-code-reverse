/**
 * Removes a specific permission rule from the given context and updates the tool permission context accordingly.
 * Throws an error if attempting to remove a rule from managed (policy) settings.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.rule - The rule object to remove. Should contain 'source', 'ruleValue', and 'ruleBehavior'.
 * @param {Object} params.initialContext - The current permission context object.
 * @param {Function} params.setToolPermissionContext - Callback to update the permission context.
 * @returns {Promise<void>} Resolves when the context has been updated.
 */
async function removePermissionRule({
  rule,
  initialContext,
  setToolPermissionContext
}) {
  // Prevent deletion from managed (policy) settings
  if (rule.source === "policySettings") {
    throw new Error("Cannot delete permission rules from managed settings");
  }

  // Convert the rule value to its internal representation
  const ruleValueInternal = formatToolNameWithRule(rule.ruleValue);
  // Map the rule behavior (e.g., 'allow'/'deny') to its permission type key
  const ruleTypeKey = getRuleTypeByPermission(rule.ruleBehavior);
  // The source of the rule (e.g., 'localSettings', 'userSettings', etc.)
  const ruleSource = rule.source;

  // Create a new context object with the rule removed from the appropriate location
  const updatedContext = {
    ...initialContext,
    [ruleTypeKey]: {
      ...initialContext[ruleTypeKey],
      [ruleSource]: initialContext[ruleTypeKey][ruleSource]?.filter(
        (existingRuleValue) => existingRuleValue !== ruleValueInternal
      ) || []
    }
  };

  // Handle any additional side effects for certain sources
  switch (ruleSource) {
    case "localSettings":
    case "userSettings":
    case "projectSettings": {
      // Call external handler for these sources
      removePermissionFromSource(rule);
      break;
    }
    case "cliArg":
      // No additional action needed for CLI argument source
      break;
  }

  // Update the permission context using the provided setter
  setToolPermissionContext(updatedContext);
}

module.exports = removePermissionRule;