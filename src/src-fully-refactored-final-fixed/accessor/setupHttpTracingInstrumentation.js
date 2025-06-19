/**
 * Sets up HTTP tracing instrumentation for Fetch and XHR requests.
 *
 * This function configures and attaches instrumentation handlers for Fetch and XHR
 * based on the provided options. It allows for custom span creation logic, propagation
 * target filtering, and optional HTTP timing collection.
 *
 * @param {Object} options - Configuration options for HTTP tracing instrumentation.
 * @param {boolean} [options.traceFetch] - Whether to instrument Fetch requests.
 * @param {boolean} [options.traceXHR] - Whether to instrument XHR requests.
 * @param {Array<string|RegExp>} [options.tracePropagationTargets] - List of targets for trace propagation.
 * @param {Array<string|RegExp>} [options.tracingOrigins] - List of origins for tracing.
 * @param {Function} [options.shouldCreateSpanForRequest] - Custom function to determine if a span should be created for a request.
 * @param {boolean} [options.enableHTTPTimings] - Whether to enable HTTP timing collection.
 * @returns {void}
 */
function setupHttpTracingInstrumentation(options) {
  // Destructure options with defaults from yN1
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
    typeof shouldCreateSpanForRequest === 'function'
      ? shouldCreateSpanForRequest
      : () => true;

  // Function to determine if a request matches the propagation targets or tracing origins
  const isPropagationTarget = (url) =>
    SIA(url, tracePropagationTargets || tracingOrigins);

  // Shared state for instrumentation
  const instrumentationState = {};

  // Instrument Fetch requests if enabled
  if (traceFetch) {
    aC.addFetchInstrumentationHandler(fetchEvent => {
      // Instrument the fetch request and get the span (if any)
      const fetchSpan = s89.instrumentFetchRequest(
        fetchEvent,
        createSpanPredicate,
        isPropagationTarget,
        instrumentationState
      );

      if (fetchSpan) {
        // Parse the URL and extract the host for attributes
        const url = getAbsoluteUrlFromOrigin(fetchEvent.fetchData.url);
        const host = url ? aC.parseUrl(url).host : undefined;
        fetchSpan.setAttributes({
          'http.url': url,
          'server.address': host
        });
      }

      // Optionally collect HTTP timings
      if (enableHTTPTimings && fetchSpan) {
        TIA(fetchSpan);
      }
    });
  }

  // Instrument XHR requests if enabled
  if (traceXHR) {
    aC.addXhrInstrumentationHandler(xhrEvent => {
      // Instrument the XHR request and get the span (if any)
      const xhrSpan = handleSentryXhrTracing(
        xhrEvent,
        createSpanPredicate,
        isPropagationTarget,
        instrumentationState
      );

      // Optionally collect HTTP timings
      if (enableHTTPTimings && xhrSpan) {
        TIA(xhrSpan);
      }
    });
  }
}

module.exports = setupHttpTracingInstrumentation;