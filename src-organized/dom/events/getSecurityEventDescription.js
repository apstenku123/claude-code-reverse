/**
 * Returns a human-readable description for a given security event object.
 *
 * Depending on the event type, this function formats and returns a string
 * describing the event, such as a rule trigger, mode change, other reason,
 * or a permission prompt tool.
 *
 * @param {Object} securityEvent - The security event object to describe.
 * @param {string} securityEvent.type - The type of the security event. Can be 'rule', 'mode', 'other', or 'permissionPromptTool'.
 * @param {Object} [securityEvent.rule] - The rule object (if type is 'rule').
 * @param {string} [securityEvent.rule.ruleValue] - The value of the triggered rule.
 * @param {string} [securityEvent.rule.source] - The source of the rule.
 * @param {string} [securityEvent.mode] - The mode name (if type is 'mode').
 * @param {string} [securityEvent.reason] - The reason for the event (if type is 'other').
 * @param {string} [securityEvent.permissionPromptToolName] - The name of the permission prompt tool (if type is 'permissionPromptTool').
 * @returns {string} Human-readable description of the security event.
 */
function getSecurityEventDescription(securityEvent) {
  switch (securityEvent.type) {
    case "rule":
      // Format: <bold rule value> rule from <source>
      return `${FA.bold(formatToolNameWithRule(securityEvent.rule.ruleValue))} rule from ${getSettingsSourceDescription(securityEvent.rule.source)}`;
    case "mode":
      // Format: <mode name> mode
      return `${M$2(securityEvent.mode)} mode`;
    case "other":
      // Return the provided reason string
      return securityEvent.reason;
    case "permissionPromptTool":
      // Format: <bold tool name> permission prompt tool
      return `${FA.bold(securityEvent.permissionPromptToolName)} permission prompt tool`;
    default:
      // Unknown type: return a generic message
      return "Unknown security event";
  }
}

module.exports = getSecurityEventDescription;