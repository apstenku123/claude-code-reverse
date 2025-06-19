/**
 * Evaluates a command for tool permissions, handling subcommands, command injection, and user prompts.
 * Determines whether a command should be allowed, denied, or require user confirmation based on rules and context.
 *
 * @param {Object} commandInput - The command input object, typically containing a 'command' property.
 * @param {Object} toolContext - The tool context, providing permission context and session info.
 * @param {Function} [permissionEvaluator=Rz2] - Optional function to further evaluate permissions (defaults to Rz2).
 * @returns {Promise<Object>} An object describing the permission decision, possible messages, and suggestions.
 */
async function evaluateAndAuthorizeCommandPermissions(commandInput, toolContext, permissionEvaluator = Rz2) {
  // Step 1: Evaluate top-level permission for the command
  const initialPermission = evaluateCommandPermission(commandInput, toolContext.getToolPermissionContext());
  if (initialPermission.behavior === "deny") return initialPermission;

  // Step 2: Recursively check for subcommand permissions
  const recursivePermission = await handleShellPipeCommand(commandInput, subInput => evaluateAndAuthorizeCommandPermissions(subInput, toolContext, permissionEvaluator));
  if (recursivePermission !== null) return recursivePermission;

  // Step 3: Extract and filter subcommands
  const subcommands = processRedirectionOperators(commandInput.command).filter(subcommand => {
    // Exclude 'cd' commands to the current directory
    if (subcommand === `cd ${iA()}`) return false;
    return true;
  });

  // Step 4: Detect multiple 'cd' commands (potentially unsafe)
  const cdCommandCount = subcommands.filter(subcommand => subcommand.startsWith("cd ")).length;
  if (cdCommandCount > 1) {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
      decisionReason: {
        type: "other",
        reason: "Multiple cd commands detected"
      },
      ruleSuggestions: null
    };
  }

  // Step 5: Evaluate each subcommand for permission
  const subcommandPermissions = subcommands.map(subcommand =>
    evaluateCommandAccess({ command: subcommand }, toolContext.getToolPermissionContext())
  );

  // List of potentially dangerous shell tokens
  const dangerousTokens = [
    '"', "'", "`", "$(", "${", "~[", "(e:", "\n", "\r", ";", "|", "&", "||", "&&", ">", "<", ">>", ">&", ">&2", "<(", ">(", "$", "\\", "#"
  ];

  // Step 6: If all subcommands are allowed and none contain dangerous tokens, allow
  const allSubcommandsAllowed = subcommandPermissions.every(permission => permission.behavior === "allow");
  const noDangerousTokens = !subcommands.some(subcommand =>
    dangerousTokens.some(token => subcommand.includes(token))
  );
  if (allSubcommandsAllowed && noDangerousTokens) {
    return {
      behavior: "allow",
      updatedInput: commandInput,
      decisionReason: {
        type: "subcommandResults",
        reasons: new Map(subcommandPermissions.map((permission, idx) => [subcommands[idx], permission]))
      }
    };
  }

  // Step 7: Evaluate the full command for injection or session issues
  const permissionResult = await permissionEvaluator(
    commandInput.command,
    toolContext.abortController.signal,
    toolContext.options.isNonInteractiveSession
  );
  if (toolContext.abortController.signal.aborted) throw new KG();
  const currentPermissionContext = toolContext.getToolPermissionContext();

  // If command injection detected or only one subcommand, delegate to determineCommandPermissionDecision
  if (permissionResult?.commandInjectionDetected || subcommands.length < 2) {
    return determineCommandPermissionDecision(commandInput, currentPermissionContext, permissionResult);
  }

  // Step 8: Evaluate each subcommand with determineCommandPermissionDecision and collect results
  const subcommandResults = new Map();
  for (const subcommand of subcommands) {
    subcommandResults.set(
      subcommand,
      determineCommandPermissionDecision(
        { ...commandInput, command: subcommand },
        currentPermissionContext,
        permissionResult?.subcommandPrefixes.get(subcommand)
      )
    );
  }

  // Step 9: If any subcommand is denied, deny the whole command
  if (subcommands.some(subcommand => subcommandResults.get(subcommand)?.behavior === "deny")) {
    return {
      behavior: "deny",
      message: `Permission to use ${P4.name} with command ${commandInput.command} has been denied.`,
      decisionReason: {
        type: "subcommandResults",
        reasons: subcommandResults
      },
      ruleSuggestions: null
    };
  }

  // Step 10: If initial permission was allow, return isBlobOrFileLikeObject
  if (initialPermission.behavior === "allow") return initialPermission;

  // Step 11: If all subcommands are allowed, allow the command
  if (subcommands.every(subcommand => subcommandResults.get(subcommand)?.behavior === "allow")) {
    return {
      behavior: "allow",
      updatedInput: commandInput,
      decisionReason: {
        type: "subcommandResults",
        reasons: subcommandResults
      }
    };
  }

  // Step 12: Aggregate rule suggestions from subcommands
  let ruleSuggestionMap = new Map();
  for (const result of subcommandResults.values()) {
    if (result.behavior !== "allow") {
      const suggestions = result.ruleSuggestions;
      if (suggestions === undefined) {
        continue;
      } else if (suggestions === null) {
        ruleSuggestionMap = null;
        break;
      } else {
        for (const suggestion of suggestions) {
          const suggestionKey = formatToolNameWithRule(suggestion);
          ruleSuggestionMap.set(suggestionKey, suggestion);
        }
      }
    }
  }
  const ruleSuggestions = ruleSuggestionMap ? Array.from(ruleSuggestionMap.values()) : null;

  // Step 13: Ask for permission with suggestions if available
  return {
    behavior: "ask",
    message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
    decisionReason: {
      type: "subcommandResults",
      reasons: subcommandResults
    },
    ruleSuggestions: ruleSuggestions
  };
}

module.exports = evaluateAndAuthorizeCommandPermissions;
