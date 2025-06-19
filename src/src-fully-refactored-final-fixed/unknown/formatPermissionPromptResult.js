/**
 * Formats the result of a permission prompt tool interaction by attaching metadata and handling decision outcomes.
 *
 * @param {Object} toolResult - The result object from the permission prompt tool interaction. Must include a 'behavior' property ('allow' or 'deny').
 * @param {string} permissionPromptToolName - The name of the permission prompt tool used.
 * @returns {Object|undefined} An object containing the original tool result with additional metadata, or undefined if behavior is unrecognized.
 */
function formatPermissionPromptResult(toolResult, permissionPromptToolName) {
  // Compose metadata about the permission prompt tool interaction
  const decisionReason = {
    type: "permissionPromptTool",
    permissionPromptToolName: permissionPromptToolName,
    toolResult: toolResult
  };

  // Handle different behaviors from the tool result
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
    // If behavior is not recognized, return undefined
  }
}

module.exports = formatPermissionPromptResult;
