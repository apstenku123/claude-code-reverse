/**
 * Returns the corresponding rule set name based on the provided access type.
 *
 * @param {string} accessType - The type of access to evaluate (e.g., 'allow' or 'deny').
 * @returns {string|undefined} The name of the rule set for the given access type, or undefined if not recognized.
 */
function getRuleSetNameByAccessType(accessType) {
  switch (accessType) {
    case "allow":
      // If access type is 'allow', return the always allow rules set name
      return "alwaysAllowRules";
    case "deny":
      // If access type is 'deny', return the always deny rules set name
      return "alwaysDenyRules";
    default:
      // For any other access type, return undefined
      return undefined;
  }
}

module.exports = getRuleSetNameByAccessType;