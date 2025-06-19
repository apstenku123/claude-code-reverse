/**
 * Streams the assistant'createInteractionAccessor response using the provided observable source and configuration.
 * This function delegates streaming to an external handler, ensuring that the assistant'createInteractionAccessor response
 * is processed and yielded as an async generator. It wraps the streaming logic within another
 * observable handler for additional processing or side effects.
 *
 * @async
 * @generator
 * @function streamAssistantResponseWithObservable
 * @param {Observable} sourceObservable - The observable source to subscribe to for streaming events.
 * @param {Object} config - Configuration options for streaming the assistant'createInteractionAccessor response.
 * @param {Object} subscription - Subscription object for managing the stream lifecycle.
 * @param {Object} inputData - The input data to be processed by the assistant.
 * @param {Object} assistantOptions - Options specific to the assistant'createInteractionAccessor behavior.
 * @param {Object} errorHandler - Handler for managing errors during streaming.
 * @yields {Object} Streamed events and normalized messages for each content block.
 * @returns {AsyncGenerator<Object>} An async generator yielding streamed assistant response events.
 */
async function* streamAssistantResponseWithObservable(
  sourceObservable,
  config,
  subscription,
  inputData,
  assistantOptions,
  errorHandler
) {
  // Delegate to the external observable handler, passing a generator that streams the assistant response
  return yield* eo1(sourceObservable, async function* () {
    // Stream the assistant'createInteractionAccessor response and yield each event
    yield* streamAssistantResponse(
      sourceObservable,
      config,
      subscription,
      inputData,
      assistantOptions,
      errorHandler
    );
  });
}

module.exports = streamAssistantResponseWithObservable;