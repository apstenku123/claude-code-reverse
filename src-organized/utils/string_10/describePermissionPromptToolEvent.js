/**
 * Generates a human-readable description for a permission prompt tool event based on its type and details.
 *
 * @param {Object} event - The event object containing details about the permission prompt tool interaction.
 * @param {string} event.type - The type of the event ('rule', 'mode', 'other', or 'permissionPromptTool').
 * @param {Object} [event.rule] - The rule object, required if type is 'rule'.
 * @param {string} [event.rule.ruleValue] - The value of the rule.
 * @param {string} [event.rule.source] - The source of the rule.
 * @param {string} [event.mode] - The mode, required if type is 'mode'.
 * @param {string} [event.reason] - The reason, required if type is 'other'.
 * @param {string} [event.permissionPromptToolName] - The name of the permission prompt tool, required if type is 'permissionPromptTool'.
 * @returns {string} a human-readable string describing the permission prompt tool event.
 */
function describePermissionPromptToolEvent(event) {
  switch (event.type) {
    case "rule":
      // Format: <bolded rule value> rule from <source>
      return `${FA.bold(formatToolNameWithRule(event.rule.ruleValue))} rule from ${getSettingsSourceDescription(event.rule.source)}`;
    case "mode":
      // Format: <mode> mode
      return `${M$2(event.mode)} mode`;
    case "other":
      // Return the provided reason as-is
      return event.reason;
    case "permissionPromptTool":
      // Format: <bolded tool name> permission prompt tool
      return `${FA.bold(event.permissionPromptToolName)} permission prompt tool`;
    default:
      // If the event type is unrecognized, return an empty string
      return '';
  }
}

module.exports = describePermissionPromptToolEvent;