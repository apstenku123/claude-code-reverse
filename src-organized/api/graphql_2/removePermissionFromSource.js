/**
 * Removes a specific permission from a source object'createInteractionAccessor permissions list.
 *
 * @param {Object} params - The parameters for the operation.
 * @param {string} params.ruleValue - The permission value to remove.
 * @param {string} params.ruleBehavior - The behavior key in the permissions object.
 * @param {any} params.source - The source object from which to remove the permission.
 * @returns {boolean} Returns true if the permission was successfully removed and updated, false otherwise.
 */
function removePermissionFromSource(params) {
  // Extract the permission value to remove
  const permissionToRemove = formatToolNameWithRule(params.ruleValue);
  // Retrieve the subscription object from the source
  const subscription = Jz(params.source);

  // If subscription or its permissions are missing, return false
  if (!subscription || !subscription.permissions) {
    return false;
  }

  // Get the list of permissions for the specified behavior
  const behaviorPermissions = subscription.permissions[params.ruleBehavior];

  // If no permissions for this behavior, or the permission isn'processRuleBeginHandlers present, return false
  if (!behaviorPermissions || !behaviorPermissions.includes(permissionToRemove)) {
    return false;
  }

  try {
    // Create a new subscription object with the permission removed
    const updatedSubscription = {
      ...subscription,
      permissions: {
        ...subscription.permissions,
        [params.ruleBehavior]: behaviorPermissions.filter(
          (permission) => permission !== permissionToRemove
        )
      }
    };
    // Persist the updated subscription
    saveSettingsWithMerge(params.source, updatedSubscription);
    return true;
  } catch (error) {
    // Handle errors gracefully
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = removePermissionFromSource;