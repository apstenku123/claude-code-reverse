/**
 * Returns the corresponding rule set name based on the provided permission type.
 *
 * @param {string} permissionType - The type of permission to evaluate (e.g., 'allow' or 'deny').
 * @returns {string|undefined} The name of the rule set associated with the permission type, or undefined if not recognized.
 */
function getRuleSetNameByPermission(permissionType) {
  switch (permissionType) {
    case "allow":
      // Return the rule set name for always-allow permissions
      return "alwaysAllowRules";
    case "deny":
      // Return the rule set name for always-deny permissions
      return "alwaysDenyRules";
    default:
      // Return undefined for unrecognized permission types
      return undefined;
  }
}

module.exports = getRuleSetNameByPermission;