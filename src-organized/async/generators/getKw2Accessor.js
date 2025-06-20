/**
 * Asynchronously yields all values produced by the streamAssistantResponse generator, wrapped by eo1.
 *
 * @param {Observable} sourceObservable - The source observable to operate on.
 * @param {Object} config - Configuration object for streamAssistantResponse.
 * @param {Object} subscription - Subscription or context for streamAssistantResponse.
 * @param {Object} input - Additional input or options for streamAssistantResponse.
 * @param {Object} generatorOptions - Generator-specific options for streamAssistantResponse.
 * @param {Object} extraOptions - Extra options or dependencies for streamAssistantResponse.
 * @yields {*} - Yields all values produced by the streamAssistantResponse generator.
 * @returns {AsyncGenerator<*, void, unknown>} An async generator yielding values from streamAssistantResponse, wrapped by eo1.
 */
async function* getKw2Accessor(
  sourceObservable,
  config,
  subscription,
  input,
  generatorOptions,
  extraOptions
) {
  // Wrap the streamAssistantResponse generator with eo1, passing all required parameters
  return yield* eo1(sourceObservable, async function* () {
    // Delegate yielding to streamAssistantResponse with all provided arguments
    yield* streamAssistantResponse(
      sourceObservable,
      config,
      subscription,
      input,
      generatorOptions,
      extraOptions
    );
  });
}

module.exports = getKw2Accessor;
