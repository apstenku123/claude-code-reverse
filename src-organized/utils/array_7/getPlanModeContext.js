/**
 * Returns an array containing a plan mode context object if the tool'createInteractionAccessor permission context is in 'plan' mode.
 * Otherwise, returns an empty array.
 *
 * @param {Object} toolInstance - The object representing the tool, expected to have a getToolPermissionContext() method.
 * @returns {Array<Object>} An array with a single object of type 'plan_mode' if in plan mode, otherwise an empty array.
 */
function getPlanModeContext(toolInstance) {
  // Retrieve the permission context for the tool
  const permissionContext = toolInstance.getToolPermissionContext();

  // If the mode is not 'plan', return an empty array
  if (permissionContext.mode !== "plan") {
    return [];
  }

  // Otherwise, return an array with the plan_mode context object
  return [
    {
      type: "plan_mode"
    }
  ];
}

module.exports = getPlanModeContext;
