/**
 * Fetches a response based on provided system, user, and assistant prompts, with optional caching and session controls.
 *
 * @param {Object} options - The options for fetching the prompt response.
 * @param {Array<string>} [options.systemPrompt=[]] - An array of system prompt strings to provide context.
 * @param {string} options.userPrompt - The user'createInteractionAccessor prompt string.
 * @param {string} [options.assistantPrompt] - The assistant'createInteractionAccessor prompt string, if any.
 * @param {boolean} [options.enablePromptCaching=false] - Whether to enable caching for the prompt.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the request.
 * @param {boolean} [options.isNonInteractiveSession] - Indicates if the session is non-interactive.
 * @param {number} [options.temperature=0] - The temperature parameter for response randomness.
 * @param {string} [options.promptCategory] - The category of the prompt.
 * @returns {Promise<any>} The response from the prompt processing function.
 */
async function fetchPromptResponse({
  systemPrompt = [],
  userPrompt,
  assistantPrompt,
  enablePromptCaching = false,
  signal,
  isNonInteractiveSession,
  temperature = 0,
  promptCategory
}) {
  // Prepare the system prompt content as an array of text objects
  const systemPromptContent = systemPrompt.map(promptText => ({
    type: "text",
    text: promptText
  }));

  // Wrap the system and user prompts using createUserMessageObject(likely a formatting or validation function)
  const formattedSystemPrompt = createUserMessageObject({ content: systemPromptContent });
  const formattedUserPrompt = createUserMessageObject({ content: userPrompt });

  // Use to1 to process the prompts and fetch the response via sendChatCompletionRequest
  // The callback returns an array with the awaited result of sendChatCompletionRequest
  const [response] = await to1([
    formattedSystemPrompt,
    formattedUserPrompt
  ], async () => {
    return [
      await sendChatCompletionRequest({
        systemPrompt,
        userPrompt,
        assistantPrompt,
        signal,
        isNonInteractiveSession,
        temperature,
        enablePromptCaching,
        promptCategory
      })
    ];
  });

  return response;
}

module.exports = fetchPromptResponse;
