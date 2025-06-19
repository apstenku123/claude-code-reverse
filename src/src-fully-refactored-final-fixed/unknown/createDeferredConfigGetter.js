/**
 * Returns a function that, when called, returns the configuration object derived from the provided source observable.
 * If the configuration cannot be derived (i.e., getOtelOtlpHeadersMetadata returns null or undefined), returns undefined.
 *
 * @param {any} sourceObservable - The source observable or input from which to derive the configuration.
 * @returns {Function|undefined} a function that returns the configuration object, or undefined if configuration could not be derived.
 */
function createDeferredConfigGetter(sourceObservable) {
  // Attempt to derive the configuration from the source observable
  const config = getOtelOtlpHeadersMetadata(sourceObservable);
  // If configuration could not be derived, return undefined
  if (config == null) return;
  // Return a function that, when called, returns the configuration
  return () => config;
}

module.exports = createDeferredConfigGetter;