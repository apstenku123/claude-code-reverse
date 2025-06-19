/**
 * Determines the permission decision for a given command, based on permission rules, command context, and possible security concerns.
 *
 * @param {Object} commandContext - The context of the command being evaluated (e.g., command details).
 * @param {Object} permissionConfig - The configuration or rules for command permissions.
 * @param {Object|null|undefined} commandQuery - The result of a command prefix query, or null/undefined if unavailable.
 * @returns {Object} An object describing the permission decision, including behavior, message, reason, and rule suggestions.
 */
function determineCommandPermissionDecision(commandContext, permissionConfig, commandQuery) {
  // First, evaluate command permission using the primary rules
  const initialPermissionResult = evaluateCommandPermission(commandContext, permissionConfig);

  // If the permission is explicitly denied or allowed, return immediately
  if (initialPermissionResult.behavior === "deny") return initialPermissionResult;
  if (initialPermissionResult.behavior === "allow") return initialPermissionResult;

  // If the command query is missing, prompt the user to grant permission
  if (commandQuery === null || commandQuery === undefined) {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
      decisionReason: {
        type: "other",
        reason: "Command prefix query failed"
      },
      ruleSuggestions: getRuleSuggestions(commandContext.command)
    };
  }

  // If a command injection is detected, prompt the user with a warning
  if (commandQuery.commandInjectionDetected) {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
      decisionReason: {
        type: "other",
        reason: "Potential command injection detected"
      },
      ruleSuggestions: null
    };
  }

  // Evaluate additional permission rules if the above checks did not resolve
  const secondaryPermissionResult = evaluateCommandAccess(commandContext, permissionConfig);
  if (secondaryPermissionResult.behavior === "deny") return secondaryPermissionResult;
  if (secondaryPermissionResult.behavior === "allow") return secondaryPermissionResult;

  // Suggest rules based on the command prefix if available, otherwise use the command itself
  const ruleSuggestions = commandQuery.commandPrefix
    ? generateToolRuleConfig(commandQuery.commandPrefix)
    : getRuleSuggestions(commandContext.command);

  // Return the secondary permission result, adding rule suggestions
  return {
    ...secondaryPermissionResult,
    ruleSuggestions
  };
}

// Export the function for use in other modules
module.exports = determineCommandPermissionDecision;

// Helper function alias for clarity (originally createToolRuleContentArray)
function getRuleSuggestions(command) {
  return createToolRuleContentArray(command);
}