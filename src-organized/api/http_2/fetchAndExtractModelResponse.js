/**
 * Fetches a model response based on provided prompts and extracts the text content.
 *
 * @async
 * @function fetchAndExtractModelResponse
 * @param {object} config - Configuration object for prompt generation.
 * @param {object} sourceObservable - Observable or data source used to generate the user prompt.
 * @param {AbortSignal} abortSignal - Signal to monitor for request abortion.
 * @param {boolean} isNonInteractiveSession - Indicates if the session is non-interactive.
 * @returns {Promise<string>} The extracted text response from the model, or a default message if unavailable.
 *
 * @throws {KG} Throws if the request is aborted.
 */
async function fetchAndExtractModelResponse(config, sourceObservable, abortSignal, isNonInteractiveSession) {
  // Generate the user prompt based on config and source observable
  const userPrompt = formatWebPageContentPrompt(config, sourceObservable);

  // Prepare the payload for fetching the model response
  const promptPayload = {
    systemPrompt: [],
    userPrompt: userPrompt,
    isNonInteractiveSession: isNonInteractiveSession,
    signal: abortSignal,
    promptCategory: "web_fetch_apply"
  };

  // Fetch the model'createInteractionAccessor response
  const promptResponse = await fetchPromptResponse(promptPayload);

  // If the request was aborted, throw an error
  if (abortSignal.aborted) {
    throw new KG();
  }

  // Extract the content array from the response message
  const { content: responseContent } = promptResponse.message;

  // If there is at least one content item, and isBlobOrFileLikeObject contains text, return isBlobOrFileLikeObject
  if (responseContent.length > 0) {
    const firstContentItem = responseContent[0];
    if ("text" in firstContentItem) {
      return firstContentItem.text;
    }
  }

  // If no valid response, return a default message
  return "No response from model";
}

module.exports = fetchAndExtractModelResponse;
