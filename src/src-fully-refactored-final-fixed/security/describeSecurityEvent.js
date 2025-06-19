/**
 * Returns a human-readable description for a given security event object.
 *
 * Depending on the event type, this function formats the description using external helpers
 * and includes relevant details such as rule values, sources, mode names, or reasons.
 *
 * @param {Object} securityEvent - The security event object to describe.
 * @param {string} securityEvent.type - The type of the security event ("rule", "mode", "other", or "permissionPromptTool").
 * @param {Object} [securityEvent.rule] - Rule details (required if type is "rule").
 * @param {string} [securityEvent.rule.ruleValue] - The value of the rule that triggered the event.
 * @param {string} [securityEvent.rule.source] - The source of the rule.
 * @param {string} [securityEvent.mode] - The mode name (required if type is "mode").
 * @param {string} [securityEvent.reason] - The reason for the event (required if type is "other").
 * @param {string} [securityEvent.permissionPromptToolName] - The name of the permission prompt tool (required if type is "permissionPromptTool").
 * @returns {string} a human-readable description of the security event.
 */
function describeSecurityEvent(securityEvent) {
  switch (securityEvent.type) {
    case "rule": {
      // Format: <bolded rule value> rule from <source>
      const ruleValue = securityEvent.rule.ruleValue;
      const ruleSource = securityEvent.rule.source;
      return `${FA.bold(formatToolNameWithRule(ruleValue))} rule from ${getSettingsSourceDescription(ruleSource)}`;
    }
    case "mode": {
      // Format: <mode name> mode
      const modeName = securityEvent.mode;
      return `${M$2(modeName)} mode`;
    }
    case "other": {
      // Return the provided reason string
      return securityEvent.reason;
    }
    case "permissionPromptTool": {
      // Format: <bolded tool name> permission prompt tool
      const toolName = securityEvent.permissionPromptToolName;
      return `${FA.bold(toolName)} permission prompt tool`;
    }
    default: {
      // Unknown type: return an empty string or a fallback message
      return "";
    }
  }
}

module.exports = describeSecurityEvent;