/**
 * Evaluates whether a read operation is permitted on a given resource, returning a decision object.
 *
 * @param {Object} resourceProvider - An object representing the resource, must implement getPath().
 * @param {any} resourceInput - Input or configuration for the resource (e.g., file path, object).
 * @param {Object} permissionContext - The context or state relevant to permission evaluation (e.g., user/session info).
 * @returns {Object} Decision object indicating whether the read is allowed, denied, or needs to ask for permission.
 */
function evaluateReadPermission(resourceProvider, resourceInput, permissionContext) {
  // If resourceProvider does not implement getPath, ask for permission
  if (typeof resourceProvider.getPath !== "function") {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${resourceProvider.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
    };
  }

  // Get the resource path from the provider
  const resourcePath = resourceProvider.getPath(resourceInput);

  // Evaluate any special permission logic (e.g., shortcut allow/deny)
  const shortcutDecision = determineEditPermission(resourceProvider, resourceInput, permissionContext);
  if (shortcutDecision.behavior === "allow") {
    return shortcutDecision;
  }

  // Check if there is an explicit deny rule for reading this resource
  const denyRule = getMatchingIgnoredPattern(resourcePath, permissionContext, "read", "deny");
  if (denyRule) {
    return {
      behavior: "deny",
      message: `Permission to read ${resourcePath} has been denied.`,
      decisionReason: {
        type: "rule",
        rule: denyRule
      },
      ruleSuggestions: null
    };
  }

  // Check if the default mode allows reading this resource
  if (nJ(resourcePath, permissionContext)) {
    return {
      behavior: "allow",
      updatedInput: resourceInput,
      decisionReason: {
        type: "mode",
        mode: "default"
      }
    };
  }

  // Check if there is an explicit allow rule for reading this resource
  const allowRule = getMatchingIgnoredPattern(resourcePath, permissionContext, "read", "allow");
  if (allowRule) {
    return {
      behavior: "allow",
      updatedInput: resourceInput,
      decisionReason: {
        type: "rule",
        rule: allowRule
      }
    };
  }

  // If none of the above, ask for permission
  return {
    behavior: "ask",
    message: `Claude requested permissions to read from ${resourcePath}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
  };
}

module.exports = evaluateReadPermission;