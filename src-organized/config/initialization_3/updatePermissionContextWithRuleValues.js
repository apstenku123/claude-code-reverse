/**
 * Updates the permission context by adding new rule values to the specified destination.
 *
 * @param {Object} params - The parameters for updating the permission context.
 * @param {string} params.ruleBehavior - The behavior of the rule (e.g., 'allow', 'deny').
 * @param {string} params.destination - The destination key within the rule type to update.
 * @param {Object} params.initialContext - The current permission context object.
 * @param {Function} params.setToolPermissionContext - Callback to update the permission context.
 * @param {Array} params.ruleValues - Array of rule values to add to the context.
 *
 * @returns {void}
 *
 * @example
 * updatePermissionContextWithRuleValues({
 *   ruleBehavior: 'allow',
 *   destination: 'users',
 *   initialContext: { allow: { users: ['alice'] } },
 *   setToolPermissionContext: (ctx) => { ... },
 *   ruleValues: ['bob', 'carol']
 * });
 */
async function updatePermissionContextWithRuleValues({
  ruleBehavior,
  destination,
  initialContext,
  setToolPermissionContext,
  ruleValues
}) {
  // Map ruleValues through formatToolNameWithRule and create a Set to ensure uniqueness
  const uniqueRuleValues = new Set(ruleValues.map(formatToolNameWithRule));

  // Get the rule type string based on the rule behavior
  const ruleType = getRuleTypeByPermission(ruleBehavior);

  // Build the updated context object
  const updatedContext = {
    ...initialContext,
    [ruleType]: {
      ...initialContext[ruleType],
      [destination]: [
        // Existing values for this destination, or empty array if none
        ...(initialContext[ruleType]?.[destination] || []),
        // Add the new unique rule values
        ...uniqueRuleValues
      ]
    }
  };

  // Perform any necessary side effects or logging
  addPermissionsToContext({
    ruleValues,
    ruleBehavior
  }, destination);

  // Update the permission context using the provided setter
  setToolPermissionContext(updatedContext);
}

module.exports = updatePermissionContextWithRuleValues;