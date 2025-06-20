/**
 * Fetches a response from the model using provided prompts and session information.
 *
 * @async
 * @function fetchAndApplyWebPromptResponse
 * @param {object} config - Configuration object for prompt generation.
 * @param {any} sourceObservable - The source observable or data to process.
 * @param {AbortSignal} abortSignal - Signal to monitor for request abortion.
 * @param {boolean} isNonInteractiveSession - Indicates if the session is non-interactive.
 * @returns {Promise<string>} The text response from the model, or a default message if no response is received.
 *
 * @throws {KG} Throws a KG error if the request is aborted.
 */
async function fetchAndApplyWebPromptResponse(config, sourceObservable, abortSignal, isNonInteractiveSession) {
  // Generate the user prompt based on the config and source observable
  const userPrompt = formatWebPageContentPrompt(config, sourceObservable);

  // Fetch the model'createInteractionAccessor response using the constructed prompts and session info
  const modelResponse = await fetchPromptResponse({
    systemPrompt: [],
    userPrompt: userPrompt,
    isNonInteractiveSession: isNonInteractiveSession,
    signal: abortSignal,
    promptCategory: "web_fetch_apply"
  });

  // If the request was aborted, throw an error
  if (abortSignal.aborted) throw new KG();

  // Extract the content from the model'createInteractionAccessor response
  const { content: responseContent } = modelResponse.message;

  // If there is at least one response, and isBlobOrFileLikeObject contains text, return isBlobOrFileLikeObject
  if (responseContent.length > 0) {
    const firstResponse = responseContent[0];
    if ("text" in firstResponse) return firstResponse.text;
  }

  // If no valid response, return a default message
  return "No response from model";
}

module.exports = fetchAndApplyWebPromptResponse;
