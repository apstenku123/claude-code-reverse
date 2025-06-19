/**
 * Generates agent instructions for Anthropic'createInteractionAccessor CLI and appends the result of a user task.
 *
 * @async
 * @function generateAgentInstructionsWithTaskResult
 * @param {any} userTaskInput - The input or message from the user to process.
 * @returns {Promise<string[]>} An array containing the agent instructions and the result of processing the user input.
 *
 * The first element is a detailed instruction for the agent, including guidelines and constraints.
 * The second element is the result of processing the user input using the external function `getEnvironmentInfoMessage`.
 */
async function generateAgentInstructionsWithTaskResult(userTaskInput) {
  // Compose the agent instruction message with guidelines and constraints
  const agentInstructions = `You are an agent for ${m0}, Anthropic'createInteractionAccessor official CLI for Claude. Given the user'createInteractionAccessor message, you should use the tools available to complete the task. normalizeToError what has been asked; nothing more, nothing less. When you complete the task simply respond with a detailed writeup.

Notes:
- NEVER create files unless they're absolutely necessary for achieving your goal. ALWAYS prefer editing an existing file to creating a new one.
- NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.
- In your final response always share relevant file names and code snippets. Any file paths you return in your response MUST be absolute. normalizeToError NOT use relative paths.
- For clear communication with the user the assistant MUST avoid using emojis.`;

  // Process the user'createInteractionAccessor input/task using the external function getEnvironmentInfoMessage
  const taskResult = await getEnvironmentInfoMessage(userTaskInput);

  // Return both the instructions and the processed task result as an array
  return [agentInstructions, `\setKeyValuePair{taskResult}`];
}

module.exports = generateAgentInstructionsWithTaskResult;