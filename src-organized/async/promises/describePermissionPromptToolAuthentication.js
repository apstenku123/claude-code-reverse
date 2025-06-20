/**
 * Returns a human-readable description of the authentication event for a permission prompt tool.
 *
 * @param {Object} authenticationEvent - The authentication event object to describe.
 * @param {string} authenticationEvent.type - The type of authentication event. Can be 'rule', 'mode', 'other', or 'permissionPromptTool'.
 * @param {Object} [authenticationEvent.rule] - The rule object, required if type is 'rule'.
 * @param {string} [authenticationEvent.rule.ruleValue] - The value of the rule.
 * @param {string} [authenticationEvent.rule.source] - The source of the rule.
 * @param {string} [authenticationEvent.mode] - The mode, required if type is 'mode'.
 * @param {string} [authenticationEvent.reason] - The reason, required if type is 'other'.
 * @param {string} [authenticationEvent.permissionPromptToolName] - The name of the permission prompt tool, required if type is 'permissionPromptTool'.
 * @returns {string} a human-readable description of the authentication event.
 */
function describePermissionPromptToolAuthentication(authenticationEvent) {
  switch (authenticationEvent.type) {
    case "rule": {
      // Format: <bolded rule value> rule from <source description>
      const ruleValue = authenticationEvent.rule.ruleValue;
      const ruleSource = authenticationEvent.rule.source;
      // FA.bold and formatToolNameWithRule are external dependencies for formatting and processing
      return `${FA.bold(formatToolNameWithRule(ruleValue))} rule from ${getSettingsSourceDescription(ruleSource)}`;
    }
    case "mode": {
      // Format: <mode description> mode
      // M$2 is an external dependency for formatting the mode
      return `${M$2(authenticationEvent.mode)} mode`;
    }
    case "other": {
      // Return the provided reason as-is
      return authenticationEvent.reason;
    }
    case "permissionPromptTool": {
      // Format: <bolded tool name> permission prompt tool
      // FA.bold is an external dependency for formatting
      return `${FA.bold(authenticationEvent.permissionPromptToolName)} permission prompt tool`;
    }
    default: {
      // Handle unexpected types gracefully
      return "Unknown authentication event type.";
    }
  }
}

module.exports = describePermissionPromptToolAuthentication;
