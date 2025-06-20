/**
 * Adds new permission values to a user'createInteractionAccessor context and updates the permissions object accordingly.
 *
 * @param {Object} params - The parameters object.
 * @param {Array<any>} params.ruleValues - Array of permission values to add.
 * @param {string} params.ruleBehavior - The permission key/behavior to update.
 * @param {any} userContext - The user context object or identifier.
 * @returns {boolean} Returns true if permissions were added successfully, false otherwise.
 */
function addPermissionsToUserContext({
  ruleValues,
  ruleBehavior
}, userContext) {
  // If there are no rule values to add, return true (nothing to do)
  if (ruleValues.length < 1) return true;

  // Map rule values to their route representations
  const mappedRuleValues = ruleValues.map(mapInteractionsToRoutes);

  // Retrieve the current user context, or get a default context if not available
  const currentContext = Jz(userContext) || xa9();

  try {
    // Extract current permissions or initialize as empty object
    const currentPermissions = currentContext.permissions || {};

    // Create a new context object with updated permissions
    const updatedContext = {
      ...currentContext,
      permissions: {
        ...currentPermissions,
        [ruleBehavior]: [
          ...(currentPermissions[ruleBehavior] || []),
          ...mappedRuleValues
        ]
      }
    };

    // Apply the updated context (side effect)
    saveSettingsWithMerge(userContext, updatedContext);
    return true;
  } catch (error) {
    // Log the error using reportErrorIfAllowed, wrapping non-Error objects
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = addPermissionsToUserContext;