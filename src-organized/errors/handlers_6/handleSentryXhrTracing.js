/**
 * Handles Sentry tracing for XHR requests by starting and ending spans as appropriate.
 * This function inspects the XHR object for Sentry metadata, manages span lifecycle,
 * and injects trace headers for distributed tracing.
 *
 * @param {object} requestContext - The context for the XHR request, expected to have an 'xhr' property.
 * @param {function} isTracingUrl - Function to determine if a URL should be traced (returns boolean).
 * @param {function} isAllowedHeaderUrl - Function to determine if trace headers should be injected for a URL (returns boolean).
 * @param {object} activeSpans - Map of active span IDs to span objects, used to manage span lifecycle.
 * @returns {object|undefined} The started span object if a new span was created, otherwise undefined.
 */
function handleSentryXhrTracing(requestContext, isTracingUrl, isAllowedHeaderUrl, activeSpans) {
  const xhr = requestContext.xhr;
  const sentryXhrData = xhr && xhr[aC.SENTRY_XHR_DATA_KEY];

  // If tracing is disabled, xhr is missing, this is a Sentry request, or no Sentry data, exit early
  if (!nC.hasTracingEnabled() || !xhr || xhr.__sentry_own_request__ || !sentryXhrData) {
    return;
  }

  // Determine if this URL should be traced
  const shouldTrace = isTracingUrl(sentryXhrData.url);

  // If this is the end of the request and tracing is enabled for this URL
  if (requestContext.endTimestamp && shouldTrace) {
    const spanId = xhr.__sentry_xhr_span_id__;
    if (!spanId) return;
    const span = activeSpans[spanId];
    // If the span exists and handleMissingDoctypeError have a status code, set the status and end the span
    if (span && sentryXhrData.status_code !== void 0) {
      nC.setHttpStatus(span, sentryXhrData.status_code);
      span.end();
      delete activeSpans[spanId];
    }
    return;
  }

  // Get current and isolation scopes for propagation context
  const currentScope = nC.getCurrentScope();
  const isolationScope = nC.getIsolationScope();

  // Normalize the URL for tracing
  const normalizedUrl = getAbsoluteUrlFromOrigin(sentryXhrData.url);
  const parsedHost = normalizedUrl ? aC.parseUrl(normalizedUrl).host : undefined;

  // If tracing is enabled for this URL, start an inactive span
  const span = shouldTrace ? nC.startInactiveSpan({
    name: `${sentryXhrData.method} ${sentryXhrData.url}`,
    onlyIfParent: true,
    attributes: {
      type: "xhr",
      "http.method": sentryXhrData.method,
      "http.url": normalizedUrl,
      url: sentryXhrData.url,
      "server.address": parsedHost,
      [nC.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: "auto.http.browser"
    },
    op: "http.client"
  }) : undefined;

  // If a span was started, store its updateSnapshotAndNotify on the xhr and in the activeSpans map
  if (span) {
    const spanId = span.spanContext().spanId;
    xhr.__sentry_xhr_span_id__ = spanId;
    activeSpans[spanId] = span;
  }

  // Get the Sentry client for header injection
  const sentryClient = nC.getClient();

  // If handleMissingDoctypeError can set headers, the URL is allowed, and handleMissingDoctypeError have a client, inject trace headers
  if (xhr.setRequestHeader && isAllowedHeaderUrl(sentryXhrData.url) && sentryClient) {
    // Merge propagation contexts from isolation and current scopes
    const propagationContext = {
      ...isolationScope.getPropagationContext(),
      ...currentScope.getPropagationContext()
    };
    const { traceId, spanId, sampled, dsc: dynamicSamplingContext } = propagationContext;

    // Prepare sentry-trace header
    const sentryTraceHeader = span
      ? nC.spanToTraceHeader(span)
      : aC.generateSentryTraceHeader(traceId, spanId, sampled);

    // Prepare baggage header
    const baggageHeader = aC.dynamicSamplingContextToSentryBaggageHeader(
      dynamicSamplingContext || (
        span
          ? nC.getDynamicSamplingContextFromSpan(span)
          : nC.getDynamicSamplingContextFromClient(traceId, sentryClient, currentScope)
      )
    );

    // Inject headers into the XHR
    BB9(xhr, sentryTraceHeader, baggageHeader);
  }

  return span;
}

module.exports = handleSentryXhrTracing;