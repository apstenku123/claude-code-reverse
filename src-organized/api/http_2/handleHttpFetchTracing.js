/**
 * Handles HTTP fetch tracing for Sentry instrumentation, managing span creation, propagation, and cleanup.
 *
 * @param {Object} fetchEvent - The event object containing fetch data and arguments.
 * @param {Function} shouldTraceUrl - Function to determine if a URL should be traced (returns boolean).
 * @param {Function} isInstrumentedUrl - Function to determine if a URL is instrumented (returns boolean).
 * @param {Object} activeSpans - Map of active span IDs to their corresponding span objects.
 * @param {string} [origin="auto.http.browser"] - The Sentry semantic attribute for the origin of the request.
 * @returns {Object|undefined} The created span object if a new span is started, otherwise undefined.
 */
function handleHttpFetchTracing(
  fetchEvent,
  shouldTraceUrl,
  isInstrumentedUrl,
  activeSpans,
  origin = "auto.http.browser"
) {
  // Check if tracing is enabled and fetchData is present
  if (!uH.hasTracingEnabled() || !fetchEvent.fetchData) return;

  // Determine if the URL should be traced
  const isTraced = shouldTraceUrl(fetchEvent.fetchData.url);

  // If the fetch has ended and the URL is traced, clean up the span
  if (fetchEvent.endTimestamp && isTraced) {
    const spanId = fetchEvent.fetchData.__span;
    if (!spanId) return;
    const span = activeSpans[spanId];
    if (span) {
      handleHttpResponseStatus(span, fetchEvent); // Complete and clean up the span
      delete activeSpans[spanId];
    }
    return;
  }

  // Get the current Sentry scope and client
  const currentScope = uH.getCurrentScope();
  const sentryClient = uH.getClient();

  // Extract method and URL from fetchData
  const { method: httpMethod, url: fetchUrl } = fetchEvent.fetchData;

  // Parse the URL for host extraction
  const parsedUrl = getAbsoluteUrl(fetchUrl);
  const serverAddress = parsedUrl ? YP.parseUrl(parsedUrl).host : undefined;

  // Start a new inactive span if the URL is traced
  const span = isTraced
    ? uH.startInactiveSpan({
        name: `${httpMethod} ${fetchUrl}`,
        onlyIfParent: true,
        attributes: {
          url: fetchUrl,
          type: "fetch",
          "http.method": httpMethod,
          "http.url": parsedUrl,
          "server.address": serverAddress,
          [uH.SEMANTIC_ATTRIBUTE_SENTRY_ORIGIN]: origin
        },
        op: "http.client"
      })
    : undefined;

  // Store the span context and map isBlobOrFileLikeObject by spanId if a span was created
  if (span) {
    const spanId = span.spanContext().spanId;
    fetchEvent.fetchData.__span = spanId;
    activeSpans[spanId] = span;
  }

  // If the URL is instrumented and a Sentry client exists, inject tracing headers
  if (isInstrumentedUrl(fetchEvent.fetchData.url) && sentryClient) {
    const requestInput = fetchEvent.args[0];
    fetchEvent.args[1] = fetchEvent.args[1] || {};
    const requestInit = fetchEvent.args[1];
    // Inject Sentry tracing headers
    requestInit.headers = createSentryHeadersFromRequestContext(requestInput, sentryClient, currentScope, requestInit, span);
  }

  return span;
}

module.exports = handleHttpFetchTracing;
