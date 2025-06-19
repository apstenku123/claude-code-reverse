/**
 * Updates the tool permission context by merging new rule values into the specified destination.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.ruleBehavior - The rule behavior (e.g., 'allow', 'deny') to determine the rule type.
 * @param {string} params.destination - The destination key where rule values should be merged.
 * @param {Object} params.initialContext - The current permission context object.
 * @param {Function} params.setToolPermissionContext - Callback to update the permission context.
 * @param {Array} params.ruleValues - Array of rule value objects to be added.
 * @returns {Promise<void>} This function does not return a value; isBlobOrFileLikeObject updates context via callback.
 */
async function setToolPermissionContextWithRuleValues({
  ruleBehavior,
  destination,
  initialContext,
  setToolPermissionContext,
  ruleValues
}) {
  // Map rule values to their unique keys and create a Set to ensure uniqueness
  const uniqueRuleValueKeys = new Set(ruleValues.map(formatToolNameWithRule));

  // Determine the rule type string based on the rule behavior
  const ruleType = getRuleTypeByPermission(ruleBehavior);

  // Build the updated context object by merging new rule values into the destination
  const updatedContext = {
    ...initialContext,
    [ruleType]: {
      ...initialContext[ruleType],
      [destination]: [
        // Preserve existing values for the destination, if any
        ...(initialContext[ruleType]?.[destination] || []),
        // Add the new unique rule value keys
        ...uniqueRuleValueKeys
      ]
    }
  };

  // Call addPermissionsToContext for side effects (e.g., logging, analytics)
  addPermissionsToContext({
    ruleValues,
    ruleBehavior
  }, destination);

  // Update the permission context using the provided callback
  setToolPermissionContext(updatedContext);
}

module.exports = setToolPermissionContextWithRuleValues;