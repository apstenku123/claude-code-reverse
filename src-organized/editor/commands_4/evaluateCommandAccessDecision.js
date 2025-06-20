/**
 * Determines whether a given command should be allowed, denied, or require user permission,
 * based on command content, matching rules, and special-case logic (e.g., 'cd' command).
 *
 * @param {Object} commandInput - The input object representing the command to evaluate. Must have a 'command' property (string).
 * @param {Object} context - Additional context or configuration required for rule evaluation.
 * @returns {Object} An object describing the access decision, including behavior ('allow', 'deny', or 'ask'),
 *                   optional messages, reasons, and rule suggestions.
 */
function evaluateCommandAccessDecision(commandInput, context) {
  // Extract and trim the command string
  const trimmedCommand = commandInput.command.trim();
  const commandName = trimmedCommand.split(" ")[0];

  // Special case: Allow 'cd' command if permitted by validateCdCommandsInInput
  if (commandName === "cd") {
    const cdCommandDecision = validateCdCommandsInInput(commandInput, iA(), C4());
    if (cdCommandDecision.behavior === "allow") {
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

  // Evaluate general command permission
  const permissionEvaluation = evaluateCommandPermission(commandInput, context);
  if (permissionEvaluation.behavior === "deny") {
    return permissionEvaluation;
  }

  // Find matching deny/allow rules using 'prefix' matching
  const {
    matchingDenyRules,
    matchingAllowRules
  } = getMatchingAllowAndDenyRules(commandInput, context, "prefix");

  // If any deny rule matches, deny the command
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

  // If the permission evaluation already allowed, return that
  if (permissionEvaluation.behavior === "allow") {
    return permissionEvaluation;
  }

  // If any allow rule matches, allow the command
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

module.exports = evaluateCommandAccessDecision;
