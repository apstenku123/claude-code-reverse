/**
 * Asynchronously yields values from a transformed accessor stream.
 *
 * This generator function delegates to the `eo1` function, providing isBlobOrFileLikeObject with the source observable
 * and an async generator that yields values from the `streamAssistantResponse` accessor with the provided parameters.
 *
 * @param {Observable} sourceObservable - The main observable source to operate on.
 * @param {Object} config - Configuration object for the accessor.
 * @param {Object} subscription - Subscription or context for the accessor operation.
 * @param {Object} input - Input data or parameters for the accessor.
 * @param {Object} getter - Getter or accessor function for retrieving values.
 * @param {Object} additionalOptions - Additional options or parameters for the accessor.
 * @yields {*} Values yielded from the transformed accessor stream.
 */
async function* yieldTransformedAccessor(
  sourceObservable,
  config,
  subscription,
  input,
  getter,
  additionalOptions
) {
  // Delegate to eo1, passing the source observable and an async generator
  // that yields values from streamAssistantResponse with the provided parameters.
  return yield* eo1(sourceObservable, async function* () {
    yield* streamAssistantResponse(
      sourceObservable,
      config,
      subscription,
      input,
      getter,
      additionalOptions
    );
  });
}

module.exports = yieldTransformedAccessor;