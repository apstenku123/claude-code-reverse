/**
 * Handles shell command parsing and permission checks, specifically supporting pipe operators.
 * If the command requires permissions not yet granted, returns an appropriate response.
 * If the command contains a pipe ('|'), splits and delegates processing.
 * Otherwise, returns null.
 *
 * @param {Object} commandContext - The context object containing the shell command and related metadata.
 * @param {Object} userConfig - The user configuration or context for command execution.
 * @returns {Promise<Object|null>} An object describing the required behavior or null if no action is needed.
 */
async function handleShellCommandWithPipeSupport(commandContext, userConfig) {
  // Check if the command requires permissions that have not been granted
  if (Tz2(commandContext.command)) {
    return {
      behavior: "ask",
      message: `Claude requested permissions to use ${P4.name}, but you haven'processRuleBeginHandlers granted isBlobOrFileLikeObject yet.`,
      decisionReason: {
        type: "other",
        reason: "Unsupported shell control operator"
      },
      ruleSuggestions: null
    };
  }

  // Parse the command into tokens
  const commandTokens = To1(commandContext.command);
  // Find the index of the pipe operator
  const pipeIndex = commandTokens.findIndex(token => token === "|");

  if (pipeIndex >= 0) {
    // Split the command into left and right parts around the pipe
    const leftCommandTokens = commandTokens.slice(0, pipeIndex);
    const rightCommandTokens = commandTokens.slice(pipeIndex + 1);
    // Delegate further processing to evaluatePipeCommandPermissions with split commands
    return evaluatePipeCommandPermissions(commandContext, leftCommandTokens, rightCommandTokens, userConfig);
  }

  // No action required if no permissions or pipe operator are involved
  return null;
}

module.exports = handleShellCommandWithPipeSupport;