/**
 * Executes a tool using the provided client and handles the response.
 * Logs the process, manages errors, sanitizes results, and optionally writes output for non-IDE sessions.
 *
 * @param {Object} options - The options for tool execution.
 * @param {Object} options.client - The client object containing the tool client and client name.
 * @param {Object} options.client.client - The tool client instance with a callTool method.
 * @param {string} options.client.name - The name of the client (e.g., 'ide').
 * @param {string} options.tool - The name of the tool to call.
 * @param {Object} options.args - The arguments to pass to the tool.
 * @param {AbortSignal} options.signal - The abort signal for cancelling the tool call.
 * @param {boolean} options.isNonInteractiveSession - Whether the session is non-interactive.
 * @returns {Promise<string|Array>} The processed tool result, either as a string or an array of formatted entries.
 * @throws {Error|Ve} Throws on tool error or abort, or rethrows unknown errors.
 */
async function executeToolWithClient({
  client: {
    client: toolClient,
    name: clientName
  },
  tool: toolName,
  args: toolArguments,
  signal: abortSignal,
  isNonInteractiveSession
}) {
  try {
    // Log the tool call
    logMcpServerDebugMessage(clientName, `Calling MCP tool: ${toolName}`);

    // Call the tool with arguments, signal, and timeout
    const toolResponse = await toolClient.callTool({
      name: toolName,
      arguments: toolArguments
    }, wm, {
      signal: abortSignal,
      timeout: c95()
    });

    // Handle error response from tool
    if ("isError" in toolResponse && toolResponse.isError) {
      let errorMessage = "Unknown error";
      if (
        "content" in toolResponse &&
        Array.isArray(toolResponse.content) &&
        toolResponse.content.length > 0
      ) {
        const firstContentEntry = toolResponse.content[0];
        if (
          firstContentEntry &&
          typeof firstContentEntry === "object" &&
          "text" in firstContentEntry
        ) {
          errorMessage = firstContentEntry.text;
        }
      } else if ("error" in toolResponse) {
        errorMessage = String(toolResponse.error);
      }
      // Log and throw the error
      logMcpServerError(clientName, errorMessage);
      throw Error(errorMessage);
    }

    // Handle successful tool result
    logMcpServerDebugMessage(clientName, `Tool call succeeded: ${JSON.stringify(toolResponse)}`);
    if ("toolResult" in toolResponse) {
      // Optionally sanitize unicode in the result
      const shouldSanitize = await fY("claude_code_unicode_sanitize");
      const resultString = shouldSanitize
        ? sanitizeUnicodeString(String(toolResponse.toolResult))
        : String(toolResponse.toolResult);
      // Write result if not in IDE
      if (clientName !== "ide") {
        await validateAndProcessUserInteraction(resultString, toolName, isNonInteractiveSession);
      }
      return resultString;
    }

    // Handle content array result
    if ("content" in toolResponse && Array.isArray(toolResponse.content)) {
      const contentArray = toolResponse.content;
      // Optionally sanitize unicode in the content array
      const shouldSanitize = await fY("claude_code_unicode_sanitize");
      const sanitizedContent = shouldSanitize ? deepTransformKeysAndValues(contentArray) : contentArray;
      // Format each media entry and flatten the result
      const formattedEntries = sanitizedContent
        .map(entry => formatMediaEntry(entry, clientName))
        .flat();
      // Write result if not in IDE
      if (clientName !== "ide") {
        await validateAndProcessUserInteraction(formattedEntries, toolName, isNonInteractiveSession);
      }
      return formattedEntries;
    }

    // Unexpected response format
    const unexpectedFormatMessage = `Unexpected response format from tool ${toolName}`;
    logMcpServerError(clientName, unexpectedFormatMessage);
    throw Error(unexpectedFormatMessage);
  } catch (error) {
    // Rethrow custom error type Ve
    if (error instanceof Ve) throw error;
    // Ignore abort errors, rethrow others
    if (!(error instanceof Error) || error.name !== "AbortError") throw error;
  }
}

module.exports = executeToolWithClient;