/**
 * Formats a permission prompt tool decision object based on the user'createInteractionAccessor behavior.
 *
 * @param {Object} toolResult - The result object from the permission prompt tool, containing at least a 'behavior' property.
 * @param {string} permissionPromptToolName - The name of the permission prompt tool being used.
 * @returns {Object|undefined} Returns a new decision object with an attached decision reason. If behavior is 'allow', returns the toolResult with decisionReason. If 'deny', also sets ruleSuggestions to null. Returns undefined for other behaviors.
 */
function formatPermissionPromptDecision(toolResult, permissionPromptToolName) {
  // Compose the decision reason object
  const decisionReason = {
    type: "permissionPromptTool",
    permissionPromptToolName: permissionPromptToolName,
    toolResult: toolResult
  };

  // Return a new object based on the behavior
  switch (toolResult.behavior) {
    case "allow":
      // For 'allow', attach the decision reason
      return {
        ...toolResult,
        decisionReason: decisionReason
      };
    case "deny":
      // For 'deny', attach the decision reason and nullify rule suggestions
      return {
        ...toolResult,
        decisionReason: decisionReason,
        ruleSuggestions: null
      };
    // For other behaviors, return undefined (implicit)
  }
}

module.exports = formatPermissionPromptDecision;