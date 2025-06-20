/**
 * Returns a human-readable description for a given permission prompt tool authentication event.
 *
 * @param {Object} event - The authentication event object.
 * @param {string} event.type - The type of the event. Can be 'rule', 'mode', 'other', or 'permissionPromptTool'.
 * @param {Object} [event.rule] - The rule object, required if type is 'rule'.
 * @param {string} [event.rule.ruleValue] - The value of the rule.
 * @param {string} [event.rule.source] - The source of the rule.
 * @param {string} [event.mode] - The mode name, required if type is 'mode'.
 * @param {string} [event.reason] - The reason for the event, required if type is 'other'.
 * @param {string} [event.permissionPromptToolName] - The name of the permission prompt tool, required if type is 'permissionPromptTool'.
 * @returns {string} a formatted, human-readable description of the authentication event.
 */
function getPermissionPromptToolDescription(event) {
  switch (event.type) {
    case "rule": {
      // Format: <bolded rule value> rule from <source>
      const ruleValue = event.rule.ruleValue;
      const ruleSource = event.rule.source;
      return `${FA.bold(formatToolNameWithRule(ruleValue))} rule from ${getSettingsSourceDescription(ruleSource)}`;
    }
    case "mode": {
      // Format: <mode> mode
      const modeName = event.mode;
      return `${M$2(modeName)} mode`;
    }
    case "other": {
      // Return the provided reason string
      return event.reason;
    }
    case "permissionPromptTool": {
      // Format: <bolded tool name> permission prompt tool
      const toolName = event.permissionPromptToolName;
      return `${FA.bold(toolName)} permission prompt tool`;
    }
    default: {
      // Handle unexpected types gracefully
      return '';
    }
  }
}

module.exports = getPermissionPromptToolDescription;