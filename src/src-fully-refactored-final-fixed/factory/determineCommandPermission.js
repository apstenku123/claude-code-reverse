/**
 * Determines the permission behavior for a given command based on matching rules and read-only status.
 *
 * @param {Object} commandInput - The input object containing the command and related metadata.
 * @param {Object} context - The context or configuration object used for rule evaluation.
 * @returns {Object} An object describing the permission decision, including behavior, messages, and reasons.
 */
function determineCommandPermission(commandInput, context) {
  // Trim the command string for consistent matching
  const trimmedCommand = commandInput.command.trim();

  // Evaluate rules for the command in the given context
  const {
    matchingDenyRules,
    matchingAllowRules
  } = getMatchingAllowAndDenyRules(commandInput, context, "exact");

  // If there is a matching deny rule, deny the permission
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

  // If there is a matching allow rule, allow the permission
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

  // Otherwise, ask for permission and provide rule suggestions
  return {
    behavior: "ask",
    message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
    ruleSuggestions: createToolRuleContentArray(trimmedCommand)
  };
}

module.exports = determineCommandPermission;