/**
 * Executes a tool with the specified client, arguments, and session type.
 *
 * @async
 * @function executeToolWithClient
 * @param {string} toolName - The name of the tool to execute.
 * @param {object} toolArguments - The arguments to pass to the tool.
 * @param {object} clientInstance - The client instance to use for execution.
 * @param {boolean} isNonInteractiveSession - Indicates if the session is non-interactive.
 * @returns {Promise<any>} The result of the executeToolWithClient execution.
 */
async function executeToolWithClient(toolName, toolArguments, clientInstance, isNonInteractiveSession) {
  // Create a new AbortController to allow for request cancellation if needed
  const abortController = new AbortController();

  // Call executeToolWithClient with the provided parameters and the abort signal
  return executeToolWithClient({
    client: clientInstance,
    tool: toolName,
    args: toolArguments,
    signal: abortController.signal,
    isNonInteractiveSession: isNonInteractiveSession
  });
}

module.exports = executeToolWithClient;
