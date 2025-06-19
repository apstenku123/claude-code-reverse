/**
 * Retrieves generated text based on provided prompts and options.
 *
 * This function prepares the system, user, and assistant prompts, then invokes the text generation logic.
 * It supports prompt caching, temperature adjustment, and non-interactive sessions.
 *
 * @async
 * @param {Object} options - The options for text generation.
 * @param {Array<string>} [options.systemPrompt=[]] - An array of system prompt strings to provide context for the model.
 * @param {string|Array<Object>} options.userPrompt - The user prompt(createInteractionAccessor) to be processed. Can be a string or an array of message objects.
 * @param {string|Array<Object>} [options.assistantPrompt] - The assistant'createInteractionAccessor previous prompt(createInteractionAccessor), if any.
 * @param {boolean} [options.enablePromptCaching=false] - Whether to enable prompt caching for efficiency.
 * @param {AbortSignal} [options.signal] - Optional AbortSignal to cancel the request.
 * @param {boolean} [options.isNonInteractiveSession] - Whether the session is non-interactive.
 * @param {number} [options.temperature=0] - Sampling temperature for text generation (higher = more random).
 * @param {string} [options.promptCategory] - Optional category for the prompt.
 * @returns {Promise<any>} Resolves with the generated text result.
 */
async function getText({
  systemPrompt = [],
  userPrompt,
  assistantPrompt,
  enablePromptCaching = false,
  signal,
  isNonInteractiveSession,
  temperature = 0,
  promptCategory
}) {
  // Prepare the system prompt as an array of message objects
  const systemPromptMessages = systemPrompt.map(systemText => ({
    type: "text",
    text: systemText
  }));

  // Wrap the system and user prompts using createUserMessageObject(likely a message formatting utility)
  const formattedSystemPrompt = createUserMessageObject({ content: systemPromptMessages });
  const formattedUserPrompt = createUserMessageObject({ content: userPrompt });

  // Use to1 to process the prompts and execute the main text generation logic
  // The callback returns an array with the result of sendChatCompletionRequest(the main text generation function)
  const [generatedText] = await to1([
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

  return generatedText;
}

module.exports = getText;