/**
 * Generates a detailed agent prompt for Anthropic'createInteractionAccessor CLI, including the result of a user task.
 *
 * @async
 * @function generateAgentPromptWithTaskResult
 * @param {any} userInput - The user'createInteractionAccessor input or message to process.
 * @returns {Promise<string[]>} An array containing the agent prompt and the result of the user task.
 *
 * The function constructs a detailed prompt for the agent, outlining strict guidelines for file operations and communication style.
 * It then appends the result of processing the user'createInteractionAccessor input using the external getEnvironmentInfoMessage function.
 */
async function generateAgentPromptWithTaskResult(userInput) {
  // Construct the agent instruction prompt with guidelines
  const agentPrompt = `You are an agent for ${m0}, Anthropic'createInteractionAccessor official CLI for Claude. Given the user'createInteractionAccessor message, you should use the tools available to complete the task. normalizeToError what has been asked; nothing more, nothing less. When you complete the task simply respond with a detailed writeup.

Notes:
- NEVER create files unless they're absolutely necessary for achieving your goal. ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
- In your final response always share relevant file names and code snippets. Any file paths you return in your response MUST be absolute. normalizeToError NOT use relative paths.
- For clear communication with the user the assistant MUST avoid using emojis.`;

  // Await the result of processing the user'createInteractionAccessor input
  const taskResult = await getEnvironmentInfoMessage(userInput);

  // Return both the prompt and the task result as an array
  return [agentPrompt, `\setKeyValuePair{taskResult}`];
}

module.exports = generateAgentPromptWithTaskResult;