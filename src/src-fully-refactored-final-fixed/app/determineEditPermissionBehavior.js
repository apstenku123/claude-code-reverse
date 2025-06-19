/**
 * Determines the appropriate permission behavior for editing a resource based on rules, modes, and granted permissions.
 *
 * @param {Object} sourceObservable - The object representing the resource or observable, expected to have a getPath method and a name property.
 * @param {any} config - The configuration or input data related to the resource.
 * @param {Object} subscription - The current permission or subscription context, including mode and other properties.
 * @returns {Object} An object describing the permission behavior (allow, deny, or ask), with relevant messages and reasons.
 */
function determineEditPermissionBehavior(sourceObservable, config, subscription) {
  // If the source does not provide a getPath method, ask for permission
  if (typeof sourceObservable.getPath !== "function") {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${sourceObservable.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
    };
  }

  // Get the resource path from the source
  const resourcePath = sourceObservable.getPath(config);

  // Check if there is a rule explicitly denying edit permissions
  const denyRule = getMatchingIgnoredPattern(resourcePath, subscription, "edit", "deny");
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

  // If the resource is in the list of special observables, ask for permission
  if (ma9().some(observablePath => resourcePath === observablePath)) {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${sourceObservable.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
      decisionReason: {
        type: "other",
        reason: "Ask for permission to edit Claude Code settings files"
      }
    };
  }

  // If the mode is 'acceptEdits' and the resource passes the mode check, allow the edit
  if (subscription.mode === "acceptEdits" && nJ(resourcePath, subscription)) {
    return {
      behavior: "allow",
      updatedInput: config,
      decisionReason: {
        type: "mode",
        mode: "acceptEdits"
      }
    };
  }

  // Check if there is a rule explicitly allowing edit permissions
  const allowRule = getMatchingIgnoredPattern(resourcePath, subscription, "edit", "allow");
  if (allowRule) {
    return {
      behavior: "allow",
      updatedInput: config,
      decisionReason: {
        type: "rule",
        rule: allowRule
      }
    };
  }

  // Default: ask for permission to write to the resource
  return {
    behavior: "ask",
    message: `Claude requested permissions to write to ${resourcePath}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`
  };
}

module.exports = determineEditPermissionBehavior;