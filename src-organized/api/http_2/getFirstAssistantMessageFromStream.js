/**
 * Retrieves the first assistant message from a streamed response.
 *
 * This function listens to an observable source of events, streams assistant responses,
 * and returns the first event where the type is 'assistant'. If no such message is found,
 * isBlobOrFileLikeObject throws an error.
 *
 * @async
 * @function getFirstAssistantMessageFromStream
 * @param {Observable} sourceObservable - The observable source to listen for events.
 * @param {Object} assistantConfig - Configuration options for the assistant response stream.
 * @param {Object} subscriptionOptions - Subscription options for the assistant response stream.
 * @param {Object} inputContext - Contextual information for the assistant input.
 * @param {Object} generationOptions - Options for assistant response generation.
 * @param {Object} additionalOptions - Additional options for streaming and logging.
 * @returns {Promise<Object>} The first assistant message event found in the stream.
 * @throws {Error} If no assistant message is found in the stream.
 */
async function getFirstAssistantMessageFromStream(
  sourceObservable,
  assistantConfig,
  subscriptionOptions,
  inputContext,
  generationOptions,
  additionalOptions
) {
  // Iterate over each event yielded by eo1, which wraps the streaming of assistant responses
  for await (const event of eo1(sourceObservable, async function* () {
    // Stream assistant responses and yield each event
    yield* streamAssistantResponse(
      sourceObservable,
      assistantConfig,
      subscriptionOptions,
      inputContext,
      generationOptions,
      additionalOptions
    );
  })) {
    // Return the first event where the type is 'assistant'
    if (event.type === "assistant") {
      return event;
    }
  }
  // If no assistant message was found, throw an error
  throw new Error("No assistant message found");
}

module.exports = getFirstAssistantMessageFromStream;