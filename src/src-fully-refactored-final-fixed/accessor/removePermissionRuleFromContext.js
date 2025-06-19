/**
 * Removes a specific permission rule from the provided context and updates the tool permission context accordingly.
 * Throws an error if attempting to remove a rule from managed (policy) settings.
 *
 * @param {Object} params - The parameters for removing a permission rule.
 * @param {Object} params.rule - The permission rule object to remove.
 * @param {Object} params.initialContext - The current permission context object.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @returns {Promise<void>} Resolves when the context has been updated.
 */
async function removePermissionRuleFromContext({
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

  // Map the rule behavior (e.g., 'allow'/'deny') to its permission type
  const ruleType = getRuleTypeByPermission(rule.ruleBehavior);

  // The source of the rule (e.g., 'localSettings', 'userSettings', etc.)
  const ruleSource = rule.source;

  // Create a new context object with the rule removed from the appropriate array
  const updatedContext = {
    ...initialContext,
    [ruleType]: {
      ...initialContext[ruleType],
      [ruleSource]: initialContext[ruleType][ruleSource]?.filter(
        (existingRuleValue) => existingRuleValue !== ruleValueInternal
      ) || []
    }
  };

  // Handle any side effects or logging for certain sources
  switch (ruleSource) {
    case "localSettings":
    case "userSettings":
    case "projectSettings": {
      removePermissionFromSource(rule); // Possibly logs or tracks the rule removal
      break;
    }
    case "cliArg":
      // No side effect needed for CLI arguments
      break;
  }

  // Update the tool permission context with the new context
  setToolPermissionContext(updatedContext);
}

module.exports = removePermissionRuleFromContext;