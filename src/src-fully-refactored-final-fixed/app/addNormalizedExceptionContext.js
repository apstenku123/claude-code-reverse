/**
 * Adds a normalized exception context to the given event if an original exception exists and is an Error.
 *
 * @param {Object} event - The event object to potentially augment with exception context.
 * @param {Object} [options={}] - Optional configuration, may contain an 'originalException' property.
 * @param {any} normalizationOptions - Options to pass to the normalization function.
 * @param {any} additionalData - Additional data to pass to the extractErrorExtraData function.
 * @returns {Object} The original or augmented event object.
 */
function addNormalizedExceptionContext(event, options = {}, normalizationOptions, additionalData) {
  // If there is no original exception or isBlobOrFileLikeObject is not an Error, return the event as-is
  if (!options.originalException || !gq.isError(options.originalException)) {
    return event;
  }

  // Get the exception name, falling back to the constructor name if necessary
  const exceptionName = options.originalException.name || options.originalException.constructor.name;

  // Attempt to extract additional context from the exception
  const extractedContext = extractErrorExtraData(options.originalException, additionalData);

  if (extractedContext) {
    // Clone the existing contexts to avoid mutating the original event
    const updatedContexts = {
      ...event.contexts
    };

    // Normalize the extracted context
    const normalizedContext = gq.normalize(extractedContext, normalizationOptions);

    // If the normalized context is a plain object, add a non-enumerable property to skip further normalization
    if (gq.a(normalizedContext)) {
      gq.addNonEnumerableProperty(normalizedContext, "__sentry_skip_normalization__", true);
      updatedContexts[exceptionName] = normalizedContext;
    }

    // Return a new event object with the updated contexts
    return {
      ...event,
      contexts: updatedContexts
    };
  }

  // If no context was extracted, return the original event
  return event;
}

module.exports = addNormalizedExceptionContext;