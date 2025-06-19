/**
 * Determines the permission behavior for a given command based on matching rules and read-only status.
 *
 * @param {Object} commandInput - The input object containing the command and related metadata.
 * @param {Object} context - The context object used for rule evaluation.
 * @returns {Object} An object describing the permission decision, including behavior, message, and reasoning.
 */
function decideCommandPermission(commandInput, context) {
  // Trim the command string for consistent matching
  const trimmedCommand = commandInput.command.trim();

  // Evaluate rules to find matching deny and allow rules
  const {
    matchingDenyRules,
    matchingAllowRules
  } = getMatchingAllowAndDenyRules(commandInput, context, "exact");

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

  // If the command is considered read-only, allow isBlobOrFileLikeObject
  if (P4.isReadOnly(commandInput)) {
    return {
      behavior: "allow",
      updatedInput: commandInput,
      decisionReason: {
        type: "other",
        reason: "Sandboxed command is allowed"
      }
    };
  }

  // Otherwise, ask the user for permission and provide rule suggestions
  return {
    behavior: "ask",
    message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
    ruleSuggestions: createToolRuleContentArray(trimmedCommand)
  };
}

module.exports = decideCommandPermission;