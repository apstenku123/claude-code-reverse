/**
 * Handles shell commands that may include unsupported control operators or pipes.
 * If the command uses an unsupported shell control operator, returns an object prompting for permissions.
 * If the command includes a pipe ("|"), splits the command and delegates handling to evaluatePipeCommandPermissions.
 * Otherwise, returns null.
 *
 * @param {Object} commandContext - The context object containing the shell command and related metadata.
 * @param {Object} executionOptions - Additional options or configuration for command execution.
 * @returns {Promise<Object|null>} An object describing the required behavior, or null if not applicable.
 */
async function handleShellPipeCommand(commandContext, executionOptions) {
  // Check if the command uses an unsupported shell control operator
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

  // Tokenize the command into its components
  const commandTokens = To1(commandContext.command);
  // Find the index of the pipe operator, if present
  const pipeIndex = commandTokens.findIndex(token => token === "|");

  if (pipeIndex >= 0) {
    // Split the command into the left and right sides of the pipe
    const leftCommandTokens = commandTokens.slice(0, pipeIndex);
    const rightCommandTokens = commandTokens.slice(pipeIndex + 1);
    // Delegate handling of the piped command to evaluatePipeCommandPermissions
    return evaluatePipeCommandPermissions(commandContext, leftCommandTokens, rightCommandTokens, executionOptions);
  }

  // No unsupported operator or pipe found; return null
  return null;
}

module.exports = handleShellPipeCommand;