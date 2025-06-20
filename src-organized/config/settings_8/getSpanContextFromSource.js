/**
 * Retrieves the span context from a given source object, if available.
 *
 * This function attempts to extract a span context from the provided source object
 * by first obtaining a tracing configuration via the Uf1 function. If the configuration
 * exists and exposes a spanContext method, isBlobOrFileLikeObject invokes that method and returns the result.
 *
 * @param {Object} sourceObject - The object from which to extract the span context.
 * @returns {Object|undefined} The span context if available, otherwise undefined.
 */
function getSpanContextFromSource(sourceObject) {
  // Attempt to retrieve the tracing configuration for the source object
  const tracingConfig = Uf1(sourceObject);
  // If tracingConfig exists, attempt to retrieve its span context
  return tracingConfig?.spanContext();
}

module.exports = getSpanContextFromSource;