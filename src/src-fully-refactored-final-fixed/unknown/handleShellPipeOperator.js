/**
 * Handles shell command parsing, specifically detecting and processing pipe ('|') operators.
 * If the command contains unsupported shell control operators, returns a permission request response.
 * If the command contains a pipe operator, delegates processing to evaluatePipeCommandPermissions with the split commands.
 *
 * @param {Object} commandContext - The context object containing the shell command and related info.
 * @param {Object} executionOptions - Additional options or configuration for command execution.
 * @returns {Promise<Object|null>} Returns a permission request object, the result of evaluatePipeCommandPermissions, or null if no pipe is found.
 */
async function handleShellPipeOperator(commandContext, executionOptions) {
  // Check if the command contains unsupported shell control operators
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

  // Tokenize the command into an array of parts
  const commandTokens = To1(commandContext.command);

  // Find the index of the first pipe operator
  const pipeIndex = commandTokens.findIndex(token => token === "|");

  if (pipeIndex >= 0) {
    // Split the command into the left and right of the pipe
    const leftCommandTokens = commandTokens.slice(0, pipeIndex);
    const rightCommandTokens = commandTokens.slice(pipeIndex + 1);
    // Delegate further processing to evaluatePipeCommandPermissions
    return evaluatePipeCommandPermissions(commandContext, leftCommandTokens, rightCommandTokens, executionOptions);
  }

  // No pipe operator found, return null
  return null;
}

module.exports = handleShellPipeOperator;