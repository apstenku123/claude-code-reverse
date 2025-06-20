/**
 * Updates the tool permission context by aggregating rule values and applying them to the specified destination.
 *
 * @param {Object} params - The parameters for updating the tool permission context.
 * @param {string} params.ruleBehavior - The behavior of the rule (e.g., 'allow', 'deny').
 * @param {string} params.destination - The destination key to update in the context.
 * @param {Object} params.initialContext - The current permission context object.
 * @param {Function} params.setToolPermissionContext - Callback to update the permission context.
 * @param {Array} params.ruleValues - Array of rule values to be added to the context.
 * @returns {Promise<void>} This function does not return a value.
 */
async function updateToolPermissionContextWithRuleValues({
  ruleBehavior,
  destination,
  initialContext,
  setToolPermissionContext,
  ruleValues
}) {
  // Map rule values using formatToolNameWithRule and create a unique set
  const uniqueRuleValues = new Set(ruleValues.map(formatToolNameWithRule));

  // Get the rule type string based on the rule behavior
  const ruleType = getRuleTypeByPermission(ruleBehavior);

  // Build the updated context by merging the new rule values into the destination
  const updatedContext = {
    ...initialContext,
    [ruleType]: {
      ...initialContext[ruleType],
      [destination]: [
        // Existing values for this destination, if any
        ...(initialContext[ruleType]?.[destination] || []),
        // Add the new unique rule values
        ...uniqueRuleValues
      ]
    }
  };

  // Perform side-effect: possibly add activity if not finished
  addPermissionsToContext({
    ruleValues,
    ruleBehavior
  }, destination);

  // Update the tool permission context with the new context
  setToolPermissionContext(updatedContext);
}

module.exports = updateToolPermissionContextWithRuleValues;