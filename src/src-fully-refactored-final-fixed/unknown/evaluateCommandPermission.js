/**
 * Evaluates whether a given command input is allowed, denied, or requires user permission.
 * Handles special cases (like 'cd' command), checks deny/allow rules, and provides decision reasons.
 *
 * @param {Object} commandInput - The command input object to evaluate. Should have a 'command' property (string).
 * @param {Object} context - The context or configuration for evaluation (rules, environment, etc).
 * @returns {Object} An object describing the permission decision, including behavior, messages, and reasons.
 */
function evaluateCommandPermission(commandInput, context) {
  // Extract and trim the command string
  const trimmedCommand = commandInput.command.trim();

  // Special handling for 'cd' command
  if (trimmedCommand.split(" ")[0] === "cd") {
    // Check if 'cd' command is allowed by validateCdCommandsInInput
    const cdDecision = validateCdCommandsInInput(commandInput, iA(), C4());
    if (cdDecision.behavior === "allow") {
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

  // Check for deny/allow via evaluateCommandPermission(possibly a global or quick rule check)
  const quickDecision = evaluateCommandPermission(commandInput, context);
  if (quickDecision.behavior === "deny") {
    return quickDecision;
  }

  // Evaluate matching rules using getMatchingAllowAndDenyRules(returns matching deny/allow rules)
  const {
    matchingDenyRules,
    matchingAllowRules
  } = getMatchingAllowAndDenyRules(commandInput, context, "prefix");

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

  // If the quick decision was allow, return isBlobOrFileLikeObject
  if (quickDecision.behavior === "allow") {
    return quickDecision;
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

  // If no rules matched, ask the user for permission
  return {
    behavior: "ask",
    message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
    ruleSuggestions: createToolRuleContentArray(trimmedCommand)
  };
}

module.exports = evaluateCommandPermission;
