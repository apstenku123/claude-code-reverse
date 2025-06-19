/**
 * Adds specified rule values as permissions to a given context object.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<any>} params.ruleValues - The array of rule values to add as permissions.
 * @param {string} params.ruleBehavior - The permission key/behavior to which the rule values will be added.
 * @param {Object} context - The context object to update permissions for.
 * @returns {boolean} Returns true if permissions were added successfully, false otherwise.
 */
function addPermissionsToContext({ ruleValues, ruleBehavior }, context) {
  // If there are no rule values to add, consider the operation successful
  if (ruleValues.length < 1) return true;

  // Map rule values using the formatToolNameWithRule transformation function
  const mappedRuleValues = ruleValues.map(formatToolNameWithRule);

  // Retrieve the current context or fallback to a default
  const currentContext = Jz(context) || xa9();

  try {
    // Get existing permissions or initialize as empty object
    const existingPermissions = currentContext.permissions || {};

    // Create a new context object with updated permissions
    const updatedContext = {
      ...currentContext,
      permissions: {
        ...existingPermissions,
        // Add new rule values to the specified behavior
        [ruleBehavior]: [
          ...(existingPermissions[ruleBehavior] || []),
          ...mappedRuleValues
        ]
      }
    };

    // Apply the updated context using saveSettingsWithMerge
    saveSettingsWithMerge(context, updatedContext);
    return true;
  } catch (error) {
    // If an error occurs, log isBlobOrFileLikeObject using reportErrorIfAllowed and return false
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = addPermissionsToContext;