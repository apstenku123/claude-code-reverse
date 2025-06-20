/**
 * Updates the rule context by adding new rule values to the specified destination within the context.
 * Calls a side-effect function and updates the tool permission context.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.ruleBehavior - The rule behavior identifier.
 * @param {string} params.destination - The destination key within the context to update.
 * @param {Object} params.initialContext - The current rule context object.
 * @param {Function} params.setToolPermissionContext - Function to update the tool permission context.
 * @param {Array} params.ruleValues - Array of rule values to add to the context.
 * @returns {Promise<void>} Resolves when the context has been updated.
 */
async function updateRuleContextWithValues({
  ruleBehavior,
  destination,
  initialContext,
  setToolPermissionContext,
  ruleValues
}) {
  // Map ruleValues through formatToolNameWithRule and create a Set to ensure uniqueness
  const uniqueRuleValues = new Set(ruleValues.map(formatToolNameWithRule));

  // Get the context key using the rule behavior
  const contextKey = getRuleTypeByPermission(ruleBehavior);

  // Create a new context object with updated values for the destination
  const updatedContext = {
    ...initialContext,
    [contextKey]: {
      ...initialContext[contextKey],
      [destination]: [
        // Preserve existing values for the destination, if any
        ...(initialContext[contextKey]?.[destination] || []),
        // Add the new unique rule values
        ...uniqueRuleValues
      ]
    }
  };

  // Call the side-effect function (e.g., logging or analytics)
  addPermissionsToContext({
    ruleValues,
    ruleBehavior
  }, destination);

  // Update the tool permission context with the new context
  setToolPermissionContext(updatedContext);
}

module.exports = updateRuleContextWithValues;