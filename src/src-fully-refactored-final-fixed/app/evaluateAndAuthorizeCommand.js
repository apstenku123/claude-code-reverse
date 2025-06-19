/**
 * Evaluates a shell command for tool permissions, handling subcommands, command injection, and user prompts.
 *
 * @param {Object} commandInput - The command input object, typically containing a 'command' property.
 * @param {Object} toolContext - The tool context, providing permission context and abort controller.
 * @param {Function} [permissionEvaluator=Rz2] - Optional permission evaluation function (defaults to Rz2).
 * @returns {Promise<Object>} An object describing the permission decision, including behavior, messages, and suggestions.
 */
async function evaluateAndAuthorizeCommand(commandInput, toolContext, permissionEvaluator = Rz2) {
  // Evaluate the command'createInteractionAccessor permission in the current context
  const initialPermission = evaluateCommandPermission(commandInput, toolContext.getToolPermissionContext());
  if (initialPermission.behavior === "deny") return initialPermission;

  // Recursively evaluate subcommands if present
  const subcommandResult = await handleShellPipeCommand(commandInput, subCmd => evaluateAndAuthorizeCommand(subCmd, toolContext, permissionEvaluator));
  if (subcommandResult !== null) return subcommandResult;

  // Extract and filter subcommands from the command
  const allSubcommands = processRedirectionOperators(commandInput.command).filter(subCmd => {
    // Exclude 'cd' commands to the home directory
    if (subCmd === `cd ${iA()}`) return false;
    return true;
  });

  // If multiple 'cd' commands are detected, prompt the user for permission
  if (allSubcommands.filter(subCmd => subCmd.startsWith("cd ")).length > 1) {
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

  // Evaluate each subcommand for permission
  const subcommandPermissions = allSubcommands.map(subCmd =>
    evaluateCommandAccess({ command: subCmd }, toolContext.getToolPermissionContext())
  );

  // List of potentially dangerous shell characters or patterns
  const dangerousShellPatterns = [
    '"', "'", "`", "$(", "${", "~[", "(e:", "\n", "\r", ";", "|", "&", "||", "&&", ">", "<", ">>", ">&", ">&2", "<(", ">(", "$", "\\", "#"
  ];

  // If all subcommands are allowed and none contain dangerous patterns, allow the command
  if (
    subcommandPermissions.every(perm => perm.behavior === "allow") &&
    !allSubcommands.some(subCmd => dangerousShellPatterns.some(pattern => subCmd.includes(pattern)))
  ) {
    return {
      behavior: "allow",
      updatedInput: commandInput,
      decisionReason: {
        type: "subcommandResults",
        reasons: new Map(subcommandPermissions.map((perm, idx) => [allSubcommands[idx], perm]))
      }
    };
  }

  // Evaluate the command using the provided permission evaluator
  const permissionResult = await permissionEvaluator(
    commandInput.command,
    toolContext.abortController.signal,
    toolContext.options.isNonInteractiveSession
  );

  // If the command was aborted, throw an error
  if (toolContext.abortController.signal.aborted) throw new KG();

  const currentPermissionContext = toolContext.getToolPermissionContext();

  // If command injection is detected or there are fewer than 2 subcommands, delegate to determineCommandPermissionDecision
  if (permissionResult?.commandInjectionDetected || allSubcommands.length < 2) {
    return determineCommandPermissionDecision(commandInput, currentPermissionContext, permissionResult);
  }

  // Map each subcommand to its permission evaluation result
  const subcommandResultsMap = new Map();
  for (const subCmd of allSubcommands) {
    subcommandResultsMap.set(
      subCmd,
      determineCommandPermissionDecision(
        { ...commandInput, command: subCmd },
        currentPermissionContext,
        permissionResult?.subcommandPrefixes.get(subCmd)
      )
    );
  }

  // If any subcommand is denied, deny the entire command
  if (allSubcommands.some(subCmd => subcommandResultsMap.get(subCmd)?.behavior === "deny")) {
    return {
      behavior: "deny",
      message: `Permission to use ${P4.name} with command ${commandInput.command} has been denied.`,
      decisionReason: {
        type: "subcommandResults",
        reasons: subcommandResultsMap
      },
      ruleSuggestions: null
    };
  }

  // If the initial permission was allow, return isBlobOrFileLikeObject
  if (initialPermission.behavior === "allow") return initialPermission;

  // If all subcommands are allowed, allow the command
  if (allSubcommands.every(subCmd => subcommandResultsMap.get(subCmd)?.behavior === "allow")) {
    return {
      behavior: "allow",
      updatedInput: commandInput,
      decisionReason: {
        type: "subcommandResults",
        reasons: subcommandResultsMap
      }
    };
  }

  // Collect rule suggestions from subcommands that are not allowed
  let ruleSuggestionsMap = new Map();
  for (const subResult of subcommandResultsMap.values()) {
    if (subResult.behavior !== "allow") {
      const suggestions = subResult.ruleSuggestions;
      if (suggestions === undefined) continue;
      else if (suggestions === null) {
        ruleSuggestionsMap = null;
        break;
      } else {
        for (const suggestion of suggestions) {
          const suggestionKey = formatToolNameWithRule(suggestion);
          ruleSuggestionsMap.set(suggestionKey, suggestion);
        }
      }
    }
  }
  const ruleSuggestions = ruleSuggestionsMap ? Array.from(ruleSuggestionsMap.values()) : null;

  // Ask the user for permission with collected suggestions
  return {
    behavior: "ask",
    message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
    decisionReason: {
      type: "subcommandResults",
      reasons: subcommandResultsMap
    },
    ruleSuggestions
  };
}

module.exports = evaluateAndAuthorizeCommand;