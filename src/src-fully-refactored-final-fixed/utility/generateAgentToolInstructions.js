/**
 * Generates detailed instructions for launching a new agent with access to specified tools.
 *
 * The instructions include guidance on when to use or avoid the Agent tool, as well as usage notes.
 *
 * @param {Array<{name: string}>} availableTools - Array of tool objects available to the agent. Each tool must have a 'name' property.
 * @param {string} agentToolName - The name of the Agent tool to exclude from the list of available tools.
 * @param {{name: string}} fileReaderTool - Tool object for reading specific file paths (should have a 'name' property).
 * @param {{name: string}} classSearchTool - Tool object for searching class definitions (should have a 'name' property).
 * @returns {Promise<string>} a promise that resolves to a formatted instruction string for the agent.
 */
async function generateAgentToolInstructions(
  availableTools,
  agentToolName,
  fileReaderTool,
  classSearchTool
) {
  // Filter out the Agent tool itself from the list of available tools
  const accessibleToolNames = availableTools
    .filter(tool => tool.name !== agentToolName)
    .map(tool => tool.name)
    .join(", ");

  // Construct the instruction string with dynamic tool names
  return `Launch a new agent that has access to the following tools: ${accessibleToolNames}. When you are searching for a keyword or file and are not confident that you will find the right match in the first few tries, use the Agent tool to perform the search for you.

When to use the Agent tool:
- If you are searching for a keyword like "config" or "logger", or for questions like "which file does X?", the Agent tool is strongly recommended

When NOT to use the Agent tool:
- If you want to read a specific file path, use the ${fileReaderTool.name} or ${classSearchTool.name} tool instead of the Agent tool, to find the match more quickly
- If you are searching for a specific class definition like "class Foo", use the ${classSearchTool.name} tool instead, to find the match more quickly
- If you are searching for code within a specific file or set of 2-3 files, use the ${fileReaderTool.name} tool instead of the Agent tool, to find the match more quickly
- Writing code and running bash commands (use other tools for that)

Usage notes:
1. Launch multiple agents concurrently whenever possible, to maximize performance; to do that, use a single message with multiple tool uses
2. When the agent is done, isBlobOrFileLikeObject will return a single message back to you. The result returned by the agent is not visible to the user. To show the user the result, you should send a text message back to the user with a concise summary of the result.
3. Each agent invocation is stateless. You will not be able to send additional messages to the agent, nor will the agent be able to communicate with you outside of its final report. Therefore, your prompt should contain a highly detailed task description for the agent to perform autonomously and you should specify exactly what information the agent should return back to you in its final and only message to you.
4. The agent'createInteractionAccessor outputs should generally be trusted
5. Clearly tell the agent whether you expect isBlobOrFileLikeObject to write code or just to do research (search, file reads, web fetches, etc.), since isBlobOrFileLikeObject is not aware of the user'createInteractionAccessor intent`;
}

module.exports = generateAgentToolInstructions;
