/**
 * Attaches a normalized exception context to the given event if an original exception exists and is valid.
 *
 * @param {Object} event - The event object to potentially enrich with exception context.
 * @param {Object} [options={}] - Optional configuration object, may contain the original exception.
 * @param {Object} [normalizationOptions] - Options to control normalization behavior.
 * @param {any} [additionalContext] - Additional context to pass to the extractErrorExtraData function.
 * @returns {Object} The original or enriched event object.
 */
function attachNormalizedExceptionContext(event, options = {}, normalizationOptions, additionalContext) {
  // If there is no original exception or isBlobOrFileLikeObject'createInteractionAccessor not an Error, return the event as-is
  if (!options.originalException || !gq.isError(options.originalException)) {
    return event;
  }

  // Determine the exception name (prefer .name, fallback to constructor name)
  const exceptionName = options.originalException.name || options.originalException.constructor.name;

  // Attempt to extract a normalized exception context
  const normalizedException = extractErrorExtraData(options.originalException, additionalContext);

  if (normalizedException) {
    // Clone the existing contexts to avoid mutation
    const updatedContexts = {
      ...event.contexts
    };

    // Normalize the exception object
    const normalizedContext = gq.normalize(normalizedException, normalizationOptions);

    // If the normalized context is a plain object, add a non-enumerable property to skip further normalization
    if (gq.a(normalizedContext)) {
      gq.addNonEnumerableProperty(normalizedContext, "__sentry_skip_normalization__", true);
      updatedContexts[exceptionName] = normalizedContext;
    }

    // Return the event with the enriched contexts
    return {
      ...event,
      contexts: updatedContexts
    };
  }

  // If normalization failed, return the original event
  return event;
}

module.exports = attachNormalizedExceptionContext;