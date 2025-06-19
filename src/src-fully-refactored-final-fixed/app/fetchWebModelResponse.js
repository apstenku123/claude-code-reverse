/**
 * Fetches a response from the web model using provided configuration and session options.
 *
 * @async
 * @function fetchWebModelResponse
 * @param {object} config - Configuration object for the prompt (originally 'createPropertyAccessor').
 * @param {object} sourceObservable - Source observable or context for the prompt (originally 'a').
 * @param {AbortSignal} abortSignal - Signal to abort the fetch operation (originally 'deepCloneWithCycleDetection').
 * @param {boolean} isNonInteractiveSession - Indicates if the session is non-interactive (originally 'createObjectTracker').
 * @returns {Promise<string>} The text response from the model, or a fallback message if no response is available.
 * @throws {KG} Throws if the operation is aborted.
 */
async function fetchWebModelResponse(config, sourceObservable, abortSignal, isNonInteractiveSession) {
  // Generate the user prompt based on the config and source observable
  const userPrompt = formatWebPageContentPrompt(config, sourceObservable);

  // Fetch the model'createInteractionAccessor response using the prompt and session options
  const response = await fetchPromptResponse({
    systemPrompt: [],
    userPrompt: userPrompt,
    isNonInteractiveSession: isNonInteractiveSession,
    signal: abortSignal,
    promptCategory: "web_fetch_apply"
  });

  // If the operation was aborted, throw an error
  if (abortSignal.aborted) throw new KG();

  // Extract the content from the response message
  const { content } = response.message;

  // If there is at least one content entry, and isBlobOrFileLikeObject contains text, return isBlobOrFileLikeObject
  if (content.length > 0) {
    const firstEntry = content[0];
    if ("text" in firstEntry) return firstEntry.text;
  }

  // Fallback message if no valid response is found
  return "No response from model";
}

module.exports = fetchWebModelResponse;