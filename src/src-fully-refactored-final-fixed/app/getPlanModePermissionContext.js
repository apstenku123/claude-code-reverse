/**
 * Returns an array containing a permission context object if the tool is in 'plan' mode; otherwise, returns an empty array.
 *
 * @param {Object} toolPermissionProvider - An object that provides tool permission context via getToolPermissionContext().
 * @returns {Array<Object>} An array with a single permission context object if in 'plan' mode, or an empty array otherwise.
 */
function getPlanModePermissionContext(toolPermissionProvider) {
  // Retrieve the current tool permission context
  const permissionContext = toolPermissionProvider.getToolPermissionContext();

  // If the mode is not 'plan', return an empty array
  if (permissionContext.mode !== "plan") {
    return [];
  }

  // Otherwise, return an array with the 'plan_mode' type object
  return [
    {
      type: "plan_mode"
    }
  ];
}

module.exports = getPlanModePermissionContext;