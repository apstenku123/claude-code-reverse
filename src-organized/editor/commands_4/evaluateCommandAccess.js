/**
 * Evaluates whether a given command input should be allowed, denied, or prompt the user for permission,
 * based on command type, permission rules, and matching allow/deny rules.
 *
 * @param {Object} commandInput - The command input object, expected to have a 'command' string property.
 * @param {Object} permissionContext - The context or configuration for permission evaluation.
 * @returns {Object} An object describing the permission decision, including behavior (allow/deny/ask), messages, reasons, and suggestions.
 */
function evaluateCommandAccess(commandInput, permissionContext) {
  // Extract and trim the command string
  const trimmedCommand = commandInput.command.trim();

  // Special handling for 'cd' commands
  if (trimmedCommand.split(" ")[0] === "cd") {
    // Check if 'cd' command is allowed by policy
    const cdCommandEvaluation = validateCdCommandsInInput(commandInput, iA(), C4());
    if (cdCommandEvaluation.behavior === "allow") {
      return {
        behavior: "allow",
        updatedInput: commandInput,
        decisionReason: {
          type: "other",
          reason: "cd command is allowed"
        }
      };
    }
  }

  // Evaluate the command against general permission rules
  const permissionEvaluation = evaluateCommandPermission(commandInput, permissionContext);
  if (permissionEvaluation.behavior === "deny") {
    return permissionEvaluation;
  }

  // Check for matching deny and allow rules using prefix matching
  const {
    matchingDenyRules,
    matchingAllowRules
  } = getMatchingAllowAndDenyRules(commandInput, permissionContext, "prefix");

  // If there is a matching deny rule, deny the command
  if (matchingDenyRules[0] !== undefined) {
    return {
      behavior: "deny",
      message: `Permission to use ${P4.name} with command ${trimmedCommand} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: matchingDenyRules[0]
      },
      ruleSuggestions: null
    };
  }

  // If the general permission evaluation allows, allow
  if (permissionEvaluation.behavior === "allow") {
    return permissionEvaluation;
  }

  // If there is a matching allow rule, allow the command
  if (matchingAllowRules[0] !== undefined) {
    return {
      behavior: "allow",
      updatedInput: commandInput,
      decisionReason: {
        type: "rule",
        rule: matchingAllowRules[0]
      }
    };
  }

  // Otherwise, ask the user for permission
  return {
    behavior: "ask",
    message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
    ruleSuggestions: createToolRuleContentArray(trimmedCommand)
  };
}

module.exports = evaluateCommandAccess;