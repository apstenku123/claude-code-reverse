/**
 * Returns the rule type string based on the provided permission action.
 *
 * @param {string} permissionAction - The permission action to evaluate (e.g., 'allow' or 'deny').
 * @returns {string|undefined} The corresponding rule type string ('alwaysAllowRules' or 'alwaysDenyRules'), or undefined if the action is unrecognized.
 */
function getRuleTypeByPermission(permissionAction) {
  switch (permissionAction) {
    case "allow":
      return "alwaysAllowRules";
    case "deny":
      return "alwaysDenyRules";
    // No default case needed; returns undefined for unrecognized actions
  }
}

module.exports = getRuleTypeByPermission;