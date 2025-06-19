/**
 * Determines the permission behavior for editing a resource based on rules, user mode, and granted permissions.
 *
 * @param {Object} resource - The resource object, must have a getPath method and a name property.
 * @param {any} inputData - The input data associated with the edit request.
 * @param {Object} permissionContext - The context object containing permission mode and other relevant info.
 * @returns {Object} An object describing the permission behavior (allow, deny, or ask), with additional context.
 */
function determineEditPermission(resource, inputData, permissionContext) {
  // If the resource does not have a getPath method, prompt to ask for permission
  if (typeof resource.getPath !== "function") {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${resource.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
    };
  }

  // Get the resource path for the given input
  const resourcePath = resource.getPath(inputData);

  // Check if there is a rule that explicitly denies editing this resource
  const denyRule = getMatchingIgnoredPattern(resourcePath, permissionContext, "edit", "deny");
  if (denyRule) {
    return {
      behavior: "deny",
      message: `Permission to edit ${resourcePath} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: denyRule
      },
      ruleSuggestions: null
    };
  }

  // If the resource path is in the list of resources that require explicit permission, ask for permission
  if (ma9().some(requiredPath => resourcePath === requiredPath)) {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${resource.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
      decisionReason: {
        type: "other",
        reason: "Ask for permission to edit Claude Code settings files"
      }
    };
  }

  // If the permission mode is 'acceptEdits' and the resource is allowed in this mode, allow the edit
  if (permissionContext.mode === "acceptEdits" && nJ(resourcePath, permissionContext)) {
    return {
      behavior: "allow",
      updatedInput: inputData,
      decisionReason: {
        type: "mode",
        mode: "acceptEdits"
      }
    };
  }

  // Check if there is a rule that explicitly allows editing this resource
  const allowRule = getMatchingIgnoredPattern(resourcePath, permissionContext, "edit", "allow");
  if (allowRule) {
    return {
      behavior: "allow",
      updatedInput: inputData,
      decisionReason: {
        type: "rule",
        rule: allowRule
      }
    };
  }

  // Default: ask for permission to write to this resource
  return {
    behavior: "ask",
    message: `Claude requested permissions to write to ${resourcePath}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
  };
}

module.exports = determineEditPermission;