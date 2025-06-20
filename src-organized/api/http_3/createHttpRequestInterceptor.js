/**
 * Creates an HTTP request interceptor that adds Sentry tracing headers and breadcrumbs to outgoing requests.
 * It supports caching of pattern matches and custom filtering logic for which requests to trace.
 *
 * @param {Object} requestContext - The context (usually 'this') to bind to the original HTTP request function.
 * @param {boolean} enableBreadcrumbs - Whether to add Sentry breadcrumbs for HTTP responses and errors.
 * @param {Function} [shouldTraceRequest] - Optional function to determine if a request should be traced (by URL).
 * @param {Array<string|RegExp>} [tracePropagationTargets] - Optional patterns to match URLs for trace propagation.
 * @returns {Function} a function that wraps an HTTP request function, adding Sentry tracing and breadcrumbs as needed.
 */
function createHttpRequestInterceptor(requestContext, enableBreadcrumbs, shouldTraceRequest, tracePropagationTargets) {
  // Caches for shouldTraceRequest and tracePropagationTargets pattern matches
  const traceRequestCache = new tW.LRUMap(100);
  const tracePropagationCache = new tW.LRUMap(100);

  /**
   * Determines if a request should be traced, with caching.
   * @param {string} url
   * @returns {boolean}
   */
  const isTraceableRequest = (url) => {
    if (shouldTraceRequest === undefined) return true;
    const cached = traceRequestCache.get(url);
    if (cached !== undefined) return cached;
    const result = shouldTraceRequest(url);
    traceRequestCache.set(url, result);
    return result;
  };

  /**
   * Determines if a request URL matches the trace propagation targets, with caching.
   * @param {string} url
   * @returns {boolean}
   */
  const matchesTracePropagationTargets = (url) => {
    if (tracePropagationTargets === undefined) return true;
    const cached = tracePropagationCache.get(url);
    if (cached !== undefined) return cached;
    const result = tW.stringMatchesSomePattern(url, tracePropagationTargets);
    tracePropagationCache.set(url, result);
    return result;
  };

  /**
   * Adds a Sentry breadcrumb for HTTP responses or errors.
   * @param {string} eventType - 'response' or 'error'
   * @param {Object} validateSdkKeyPresence - Data about the HTTP request
   * @param {Object} requestInstance - The HTTP request object
   * @param {Object} [response] - The HTTP response object, if available
   */
  function addHttpBreadcrumb(eventType, validateSdkKeyPresence, requestInstance, response) {
    if (!FZ.getCurrentHub().getIntegration(CP)) return;
    FZ.addBreadcrumb({
      category: "http",
      data: {
        status_code: response && response.statusCode,
        ...validateSdkKeyPresence
      },
      type: "http"
    }, {
      event: eventType,
      request: requestInstance,
      response: response
    });
  }

  /**
   * Returns a function that wraps the original HTTP request function with tracing and breadcrumb logic.
   * @param {Function} originalRequestFunction - The HTTP request function to wrap
   * @returns {Function}
   */
  return function wrapHttpRequest(originalRequestFunction) {
    return function interceptedRequest(...requestArgs) {
      // Normalize and extract request arguments and URLs
      const normalizedArgs = bc.normalizeRequestArgs(requestContext, requestArgs);
      const createRequestOptions = normalizedArgs[0];
      const rawUrl = bc.extractRawUrl(createRequestOptions);
      const parsedUrl = bc.extractUrl(createRequestOptions);
      const sentryClient = FZ.getClient();

      // Skip tracing for Sentry'createInteractionAccessor own requests
      if (FZ.isSentryRequestUrl(parsedUrl, sentryClient)) {
        return originalRequestFunction.apply(requestContext, normalizedArgs);
      }

      const currentScope = FZ.getCurrentScope();
      const isolationScope = FZ.getIsolationScope();
      const activeSpan = FZ.getActiveSpan();
      const validateSdkKeyPresence = buildHttpRequestMetadata(parsedUrl, createRequestOptions);

      // Only create a span if the request should be traced
      const span = isTraceableRequest(rawUrl)
        ? Dx([
            activeSpan,
            "optionalAccess",
            (parent) => parent.startChild,
            "call",
            (startChild) => startChild({
              op: "http.client",
              origin: "auto.http.node.http",
              description: `${validateSdkKeyPresence["http.method"]} ${validateSdkKeyPresence.url}`,
              data: validateSdkKeyPresence
            })
          ])
        : undefined;

      // Add Sentry trace headers if client exists and URL matches propagation targets
      if (sentryClient && matchesTracePropagationTargets(rawUrl)) {
        // Merge propagation context from isolation and current scopes
        const {
          traceId,
          spanId,
          sampled,
          dsc: dynamicSamplingContext
        } = {
          ...isolationScope.getPropagationContext(),
          ...currentScope.getPropagationContext()
        };

        // Compute sentry-trace and baggage headers
        const sentryTraceHeader = span
          ? FZ.spanToTraceHeader(span)
          : tW.generateSentryTraceHeader(traceId, spanId, sampled);

        const baggageHeader = tW.dynamicSamplingContextToSentryBaggageHeader(
          dynamicSamplingContext ||
          (span
            ? FZ.getDynamicSamplingContextFromSpan(span)
            : FZ.getDynamicSamplingContextFromClient(traceId, sentryClient, currentScope))
        );

        // Inject headers into the outgoing request
        addSentryTracingHeaders(createRequestOptions, parsedUrl, sentryTraceHeader, baggageHeader);
      } else if (iN1.DEBUG_BUILD) {
        tW.logger.log(
          `[Tracing] Not adding sentry-trace header to outgoing request (${parsedUrl}) due to mismatching tracePropagationTargets option.`
        );
      }

      // Call the original request, and attach listeners for response and error
      return originalRequestFunction.apply(requestContext, normalizedArgs)
        .once("response", function onResponse(response) {
          const requestInstance = this;
          if (enableBreadcrumbs) {
            addHttpBreadcrumb("response", validateSdkKeyPresence, requestInstance, response);
          }
          if (span) {
            if (response.statusCode) {
              FZ.setHttpStatus(span, response.statusCode);
            }
            // Clean up and finish the span
            span.updateName(
              bc.cleanSpanDescription(
                FZ.spanToJSON(span).description || "",
                createRequestOptions,
                requestInstance
              ) || ""
            );
            span.end();
          }
        })
        .once("error", function onError() {
          const requestInstance = this;
          if (enableBreadcrumbs) {
            addHttpBreadcrumb("error", validateSdkKeyPresence, requestInstance);
          }
          if (span) {
            FZ.setHttpStatus(span, 500);
            span.updateName(
              bc.cleanSpanDescription(
                FZ.spanToJSON(span).description || "",
                createRequestOptions,
                requestInstance
              ) || ""
            );
            span.end();
          }
        });
    };
  };
}

module.exports = createHttpRequestInterceptor;