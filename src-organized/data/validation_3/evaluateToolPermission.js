/**
 * Evaluates whether a tool can be used based on permission rules, input validation, and context.
 * 
 * @async
 * @function evaluateToolPermission
 * @param {Object} tool - The tool object to check permissions for. Must have `name`, `inputSchema`, and `checkPermissions`.
 * @param {any} input - The input data to validate against the tool'createInteractionAccessor input schema.
 * @param {Object} permissionContext - The permission context object, providing methods and state for permission evaluation.
 * @returns {Promise<Object>} An object describing the permission decision, including behavior, reason, and optional messages.
 */
async function evaluateToolPermission(tool, input, permissionContext) {
  // Abort if the operation has already been cancelled
  if (permissionContext.abortController.signal.aborted) {
    throw new KG();
  }

  // Check for a rule that explicitly denies permission for this tool
  const denyRule = findMatchingSubscription(permissionContext.getToolPermissionContext(), tool);
  if (denyRule) {
    return {
      behavior: "deny",
      decisionReason: {
        type: "rule",
        rule: denyRule
      },
      ruleSuggestions: null,
      message: `Permission to use ${tool.name} has been denied.`
    };
  }

  let permissionResult;
  try {
    // Validate the input against the tool'createInteractionAccessor schema
    const parsedInput = tool.inputSchema.parse(input);
    // Check permissions using the tool'createInteractionAccessor own method
    permissionResult = await tool.checkPermissions(parsedInput, permissionContext);
  } catch (error) {
    // Log the error and ask for clarification if input or permission check fails
    reportErrorIfAllowed(error);
    return {
      behavior: "ask",
      message: "Error checking permissions"
    };
  }

  // If the tool'createInteractionAccessor permission check explicitly denies, return that result
  if (permissionResult?.behavior === "deny") {
    return permissionResult;
  }

  // If the context is set to bypass permissions, allow the action
  if (permissionContext.getToolPermissionContext().mode === "bypassPermissions") {
    return {
      behavior: "allow",
      updatedInput: input,
      decisionReason: {
        type: "mode",
        mode: permissionContext.getToolPermissionContext().mode
      }
    };
  }

  // Check for a rule that explicitly allows permission for this tool
  const allowRule = fa9(permissionContext.getToolPermissionContext(), tool);
  if (allowRule) {
    return {
      behavior: "allow",
      updatedInput: input,
      decisionReason: {
        type: "rule",
        rule: allowRule
      }
    };
  }

  // If the tool'createInteractionAccessor permission check explicitly allows, return that result
  if (permissionResult.behavior === "allow") {
    return permissionResult;
  }

  // Otherwise, ask for permission
  return {
    ...permissionResult,
    behavior: "ask",
    message: `Claude requested permissions to use ${tool.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
  };
}

module.exports = evaluateToolPermission;