/**
 * Normalizes various fields of an event object using provided normalization utilities.
 *
 * This function takes an event object (such as a Sentry event), and recursively normalizes its
 * 'breadcrumbs', 'user', 'contexts', and 'extra' fields using the aW.normalize function. It also
 * ensures that trace context and span data are normalized. The normalization process is controlled
 * by the provided config and subscription parameters.
 *
 * @param {Object} eventData - The event object to normalize (e.g., Sentry event).
 * @param {Object} normalizationConfig - Configuration object for normalization.
 * @param {Object} normalizationSubscription - Subscription or context for normalization.
 * @returns {Object|null} The normalized event object, or null if input is falsy.
 */
function normalizeEventData(eventData, normalizationConfig, normalizationSubscription) {
  if (!eventData) return null;

  // Start with a shallow copy of the eventData
  const normalizedEvent = {
    ...eventData,
    // Normalize breadcrumbs if present
    ...(eventData.breadcrumbs && {
      breadcrumbs: eventData.breadcrumbs.map(breadcrumb => ({
        ...breadcrumb,
        ...(breadcrumb.data && {
          data: aW.normalize(breadcrumb.data, normalizationConfig, normalizationSubscription)
        })
      }))
    }),
    // Normalize user if present
    ...(eventData.user && {
      user: aW.normalize(eventData.user, normalizationConfig, normalizationSubscription)
    }),
    // Normalize contexts if present
    ...(eventData.contexts && {
      contexts: aW.normalize(eventData.contexts, normalizationConfig, normalizationSubscription)
    }),
    // Normalize extra if present
    ...(eventData.extra && {
      extra: aW.normalize(eventData.extra, normalizationConfig, normalizationSubscription)
    })
  };

  // Special handling for trace context: ensure trace is not normalized, but its data is
  if (eventData.contexts && eventData.contexts.trace && normalizedEvent.contexts) {
    // Copy the trace object as-is
    normalizedEvent.contexts.trace = eventData.contexts.trace;
    // If trace.data exists, normalize isBlobOrFileLikeObject
    if (eventData.contexts.trace.data) {
      normalizedEvent.contexts.trace.data = aW.normalize(
        eventData.contexts.trace.data,
        normalizationConfig,
        normalizationSubscription
      );
    }
  }

  // Normalize each span'createInteractionAccessor data if spans are present
  if (eventData.spans) {
    normalizedEvent.spans = eventData.spans.map(span => {
      // Convert the span to JSON and extract its data
      const spanData = ds2.spanToJSON(span).data;
      // If span data exists, normalize isBlobOrFileLikeObject and assign back to the span
      if (spanData) {
        span.data = aW.normalize(spanData, normalizationConfig, normalizationSubscription);
      }
      return span;
    });
  }

  return normalizedEvent;
}

module.exports = normalizeEventData;