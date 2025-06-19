/**
 * Executes a tool via the provided client, processes the response, and handles errors and output formatting.
 *
 * @param {Object} params - The parameters for executing the tool.
 * @param {Object} params.client - The client object containing the tool caller and client name.
 * @param {Object} params.client.client - The client instance used to call the tool.
 * @param {string} params.client.name - The name of the client (e.g., 'ide').
 * @param {string} params.tool - The name of the tool to call.
 * @param {Object} params.args - The arguments to pass to the tool.
 * @param {AbortSignal} params.signal - The abort signal for cancelling the tool call.
 * @param {boolean} params.isNonInteractiveSession - Indicates if the session is non-interactive.
 * @returns {Promise<string|Array>} The processed tool result, either as a string or an array of formatted content.
 * @throws {Error} Throws if the tool call fails or returns an unexpected response format.
 */
async function executeToolAndProcessResponse({
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
    // Log the tool call attempt
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
      // Prefer error message from content if available
      if (
        "content" in toolResponse &&
        Array.isArray(toolResponse.content) &&
        toolResponse.content.length > 0
      ) {
        const firstContentItem = toolResponse.content[0];
        if (
          firstContentItem &&
          typeof firstContentItem === "object" &&
          "text" in firstContentItem
        ) {
          errorMessage = firstContentItem.text;
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
      // Optionally sanitize unicode output
      const shouldSanitize = await fY("claude_code_unicode_sanitize");
      const resultString = shouldSanitize
        ? sanitizeUnicodeString(String(toolResponse.toolResult))
        : String(toolResponse.toolResult);
      // Optionally record the result if not in IDE
      if (clientName !== "ide") {
        await validateAndProcessUserInteraction(resultString, toolName, isNonInteractiveSession);
      }
      return resultString;
    }

    // Handle content array response
    if ("content" in toolResponse && Array.isArray(toolResponse.content)) {
      const contentArray = toolResponse.content;
      // Optionally sanitize unicode in content
      const shouldSanitize = await fY("claude_code_unicode_sanitize");
      const sanitizedContent = shouldSanitize ? deepTransformKeysAndValues(contentArray) : contentArray;
      // Format each content item and flatten the result
      const formattedContent = sanitizedContent
        .map(contentItem => formatMediaResource(contentItem, clientName))
        .flat();
      // Optionally record the result if not in IDE
      if (clientName !== "ide") {
        await validateAndProcessUserInteraction(formattedContent, toolName, isNonInteractiveSession);
      }
      return formattedContent;
    }

    // If response format is unexpected, throw an error
    const unexpectedFormatMessage = `Unexpected response format from tool ${toolName}`;
    logMcpServerError(clientName, unexpectedFormatMessage);
    throw Error(unexpectedFormatMessage);
  } catch (error) {
    // Rethrow custom Ve errors
    if (error instanceof Ve) throw error;
    // Ignore abort errors, rethrow others
    if (!(error instanceof Error) || error.name !== "AbortError") throw error;
  }
}

module.exports = executeToolAndProcessResponse;
