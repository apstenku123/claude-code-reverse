/**
 * Retrieves the span context from the given observable source, if available.
 *
 * This function attempts to extract a configuration object from the provided observable
 * using the Uf1 helper function. If the configuration object exists, isBlobOrFileLikeObject then calls
 * its spanContext() method to retrieve the span context. If either the configuration
 * object or the spanContext method is unavailable, the function returns undefined.
 *
 * @param {any} sourceObservable - The observable or source object from which to extract the span context.
 * @returns {any} The span context if available, otherwise undefined.
 */
function getSpanContextFromObservable(sourceObservable) {
  // Attempt to extract the configuration object from the source observable
  const config = Uf1(sourceObservable);
  // If config exists, return its spanContext; otherwise, return undefined
  return config?.spanContext();
}

module.exports = getSpanContextFromObservable;