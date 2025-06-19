/**
 * Returns a human-readable description for the reason a permission prompt tool authentication was triggered.
 *
 * @param {Object} authenticationReason - The reason object for authentication.
 * @param {string} authenticationReason.type - The type of authentication reason. Can be 'rule', 'mode', 'other', or 'permissionPromptTool'.
 * @param {Object} [authenticationReason.rule] - The rule object, present if type is 'rule'.
 * @param {string} [authenticationReason.rule.ruleValue] - The value of the rule.
 * @param {string} [authenticationReason.rule.source] - The source of the rule.
 * @param {string} [authenticationReason.mode] - The mode name, present if type is 'mode'.
 * @param {string} [authenticationReason.reason] - The reason string, present if type is 'other'.
 * @param {string} [authenticationReason.permissionPromptToolName] - The name of the permission prompt tool, present if type is 'permissionPromptTool'.
 * @returns {string} a human-readable description of the authentication reason.
 */
function describePermissionPromptToolAuthenticationReason(authenticationReason) {
  switch (authenticationReason.type) {
    case "rule": {
      // Format: <bolded rule value> rule from <source>
      const ruleValue = authenticationReason.rule.ruleValue;
      const ruleSource = authenticationReason.rule.source;
      return `${FA.bold(formatToolNameWithRule(ruleValue))} rule from ${getSettingsSourceDescription(ruleSource)}`;
    }
    case "mode": {
      // Format: <mode name> mode
      const modeName = authenticationReason.mode;
      return `${M$2(modeName)} mode`;
    }
    case "other": {
      // Return the provided reason string
      return authenticationReason.reason;
    }
    case "permissionPromptTool": {
      // Format: <bolded tool name> permission prompt tool
      const toolName = authenticationReason.permissionPromptToolName;
      return `${FA.bold(toolName)} permission prompt tool`;
    }
    default: {
      // Handle unexpected types gracefully
      return "Unknown authentication reason";
    }
  }
}

module.exports = describePermissionPromptToolAuthenticationReason;