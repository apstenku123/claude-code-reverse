/**
 * Returns a human-readable description for a security rule or mode event.
 *
 * Depending on the type of the input object, this function will format and return a descriptive string
 * for a rule, mode, permission prompt tool, or other security-related reason.
 *
 * @param {Object} securityEvent - The security event object to describe.
 * @param {string} securityEvent.type - The type of the security event ('rule', 'mode', 'other', or 'permissionPromptTool').
 * @param {Object} [securityEvent.rule] - The rule object (required if type is 'rule').
 * @param {string} [securityEvent.rule.ruleValue] - The value of the rule (required if type is 'rule').
 * @param {string} [securityEvent.rule.source] - The source of the rule (required if type is 'rule').
 * @param {string} [securityEvent.mode] - The mode name (required if type is 'mode').
 * @param {string} [securityEvent.reason] - The reason string (required if type is 'other').
 * @param {string} [securityEvent.permissionPromptToolName] - The name of the permission prompt tool (required if type is 'permissionPromptTool').
 * @returns {string} a formatted, human-readable description of the security event.
 */
function getSecurityRuleDescription(securityEvent) {
  switch (securityEvent.type) {
    case "rule":
      // Format: "<bolded rule value> rule from <source>"
      return `${FA.bold(formatToolNameWithRule(securityEvent.rule.ruleValue))} rule from ${getSettingsSourceDescription(securityEvent.rule.source)}`;
    case "mode":
      // Format: "<mode name> mode"
      return `${M$2(securityEvent.mode)} mode`;
    case "other":
      // Return the provided reason string
      return securityEvent.reason;
    case "permissionPromptTool":
      // Format: "<bolded tool name> permission prompt tool"
      return `${FA.bold(securityEvent.permissionPromptToolName)} permission prompt tool`;
    default:
      // Handle unexpected types gracefully
      return "Unknown security event type";
  }
}

module.exports = getSecurityRuleDescription;