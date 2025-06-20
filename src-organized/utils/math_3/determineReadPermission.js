/**
 * Determines the read permission for a given resource and context.
 *
 * This function checks if the provided resource (sourceObject) has the necessary permissions
 * to perform a 'read' operation based on the current configuration and permission context.
 * It returns an object describing the permission behavior (allow, deny, or ask),
 * along with relevant messages and decision reasons.
 *
 * @param {Object} sourceObject - The resource or object for which permissions are being checked. Must implement getPath().
 * @param {any} inputConfig - The input or configuration relevant to the permission check (e.g., file path, user input).
 * @param {Object} permissionContext - The current permission context or subscription object.
 * @returns {Object} An object describing the permission decision, including behavior, messages, and reasons.
 */
function determineReadPermission(sourceObject, inputConfig, permissionContext) {
  // Check if the sourceObject implements the required getPath method
  if (typeof sourceObject.getPath !== "function") {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${sourceObject.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
    };
  }

  // Get the resource path from the sourceObject
  const resourcePath = sourceObject.getPath(inputConfig);

  // Check for explicit permission via determineEditPermission(possibly a shortcut or override)
  const shortcutPermission = determineEditPermission(sourceObject, inputConfig, permissionContext);
  if (shortcutPermission.behavior === "allow") {
    return shortcutPermission;
  }

  // Check if there is a rule that explicitly denies read access
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
      updatedInput: inputConfig,
      decisionReason: {
        type: "mode",
        mode: "default"
      }
    };
  }

  // Check if there is a rule that explicitly allows read access
  const allowRule = getMatchingIgnoredPattern(resourcePath, permissionContext, "read", "allow");
  if (allowRule) {
    return {
      behavior: "allow",
      updatedInput: inputConfig,
      decisionReason: {
        type: "rule",
        rule: allowRule
      }
    };
  }

  // If no explicit permission or denial, ask the user for permission
  return {
    behavior: "ask",
    message: `Claude requested permissions to read from ${resourcePath}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
  };
}

module.exports = determineReadPermission;