/**
 * Initializes HTTP tracing instrumentation for Fetch and XHR requests.
 *
 * This function sets up instrumentation handlers for Fetch and XHR requests,
 * allowing for tracing, propagation, and optional HTTP timing collection.
 * It supports custom span creation logic and origin filtering.
 *
 * @param {Object} options - Configuration options for HTTP tracing instrumentation.
 * @param {boolean} [options.traceFetch] - Enable tracing for Fetch requests.
 * @param {boolean} [options.traceXHR] - Enable tracing for XHR requests.
 * @param {Array<string|RegExp>} [options.tracePropagationTargets] - List of origins/targets for trace propagation.
 * @param {Array<string|RegExp>} [options.tracingOrigins] - Legacy list of origins for tracing (deprecated).
 * @param {function} [options.shouldCreateSpanForRequest] - Custom function to determine if a span should be created for a request.
 * @param {boolean} [options.enableHTTPTimings] - Enable collection of HTTP timing metrics.
 * @returns {void}
 */
function initializeHttpTracingInstrumentation(options) {
  // Merge default configuration from yN1 with user-provided options
  const {
    traceFetch = yN1.traceFetch,
    traceXHR = yN1.traceXHR,
    tracePropagationTargets = yN1.tracePropagationTargets,
    tracingOrigins = yN1.tracingOrigins,
    shouldCreateSpanForRequest = yN1.shouldCreateSpanForRequest,
    enableHTTPTimings = yN1.enableHTTPTimings
  } = options || {};

  // Determine the function to decide if a span should be created for a request
  const createSpanPredicate =
    typeof shouldCreateSpanForRequest === "function"
      ? shouldCreateSpanForRequest
      : () => true;

  // Function to check if a request matches the propagation targets or tracing origins
  const isTracingOrigin = (url) => SIA(url, tracePropagationTargets || tracingOrigins);

  // Shared state object for instrumentation (purpose depends on implementation)
  const instrumentationState = {};

  // Setup Fetch instrumentation if enabled
  if (traceFetch) {
    aC.addFetchInstrumentationHandler(fetchEvent => {
      // Instrument the fetch request and get the span (if created)
      const span = s89.instrumentFetchRequest(
        fetchEvent,
        createSpanPredicate,
        isTracingOrigin,
        instrumentationState
      );
      if (span) {
        // Extract and parse the URL for attributes
        const url = getAbsoluteUrlFromOrigin(fetchEvent.fetchData.url);
        const host = url ? aC.parseUrl(url).host : undefined;
        // Set span attributes for URL and host
        span.setAttributes({
          "http.url": url,
          "server.address": host
        });
      }
      // Optionally collect HTTP timings if enabled
      if (enableHTTPTimings && span) {
        TIA(span);
      }
    });
  }

  // Setup XHR instrumentation if enabled
  if (traceXHR) {
    aC.addXhrInstrumentationHandler(xhrEvent => {
      // Instrument the XHR request and get the span (if created)
      const span = handleSentryXhrTracing(
        xhrEvent,
        createSpanPredicate,
        isTracingOrigin,
        instrumentationState
      );
      // Optionally collect HTTP timings if enabled
      if (enableHTTPTimings && span) {
        TIA(span);
      }
    });
  }
}

module.exports = initializeHttpTracingInstrumentation;