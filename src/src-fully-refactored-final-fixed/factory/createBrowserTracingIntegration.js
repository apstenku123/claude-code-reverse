/**
 * Factory function to create and configure the Browser Tracing integration for Sentry.
 *
 * This integration instruments browser navigation, page loads, user interactions, and outgoing requests
 * to provide distributed tracing and performance monitoring. It sets up event listeners, web vitals tracking,
 * and outgoing request instrumentation according to the provided options.
 *
 * @param {Object} [userOptions={}] - Configuration options for the tracing integration.
 * @returns {Object} The Browser Tracing integration object with setup and configuration methods.
 */
function createBrowserTracingIntegration(userOptions = {}) {
  // Determine if handleMissingDoctypeError should log trace propagation targets (for debugging)
  const shouldDebugTracePropagation = bq.DEBUG_BUILD
    ? Boolean(userOptions.tracePropagationTargets || userOptions.tracingOrigins)
    : false;

  // Ensure tracing extensions are registered
  HQ.addTracingExtensions();

  // For backward compatibility: if only tracingOrigins is set, use isBlobOrFileLikeObject as tracePropagationTargets
  if (!userOptions.tracePropagationTargets && userOptions.tracingOrigins) {
    userOptions.tracePropagationTargets = userOptions.tracingOrigins;
  }

  // Merge default options with user-provided options
  const tracingOptions = {
    ...UB9, // Default tracing options
    ...userOptions
  };

  // Start tracking Web Vitals (LCP, FCP, CLS, etc.)
  const stopWebVitalsTracking = kc.startTrackingWebVitals();

  // Used for INP tracking
  const inpTrackingState = {};

  // Optionally start INP tracking if enabled
  if (tracingOptions.enableInp) {
    kc.startTrackingINP(inpTrackingState, tracingOptions.interactionsSampleRate);
  }

  // Optionally start Long Task tracking if enabled
  if (tracingOptions.enableLongTask) {
    kc.startTrackingLongTasks();
  }

  // Optionally start interaction tracking if enabled via experiments
  if (tracingOptions._experiments.enableInteractions) {
    kc.startTrackingInteractions();
  }

  // Holds the most recent transaction name/context
  const currentTransactionContext = {
    name: undefined,
    context: undefined
  };

  /**
   * Starts a new idle transaction (navigation or pageload) with proper context and propagation.
   *
   * @param {Object} transactionContext - Context for the transaction (op, name, metadata, etc.)
   * @returns {Object} The started idle transaction
   */
  function startIdleTransactionWithContext(transactionContext) {
    const currentHub = HQ.getCurrentHub();
    const {
      beforeStartSpan,
      idleTimeout,
      finalTimeout,
      heartbeatInterval
    } = tracingOptions;
    const isPageLoad = transactionContext.op === "pageload";
    let transactionData;

    if (isPageLoad) {
      // For pageload, extract trace headers from the DOM
      const sentryTraceHeader = fN1("sentry-trace");
      const baggageHeader = fN1("baggage");
      const {
        traceId,
        dsc: dynamicSamplingContext,
        parentSpanId,
        sampled
      } = fJ.propagationContextFromHeaders(sentryTraceHeader, baggageHeader);
      transactionData = {
        traceId,
        parentSpanId,
        parentSampled: sampled,
        ...transactionContext,
        metadata: {
          ...transactionContext.metadata,
          dynamicSamplingContext
        },
        trimEnd: true
      };
    } else {
      transactionData = {
        trimEnd: true,
        ...transactionContext
      };
    }

    // Allow user to modify the transaction context before starting
    const finalTransactionData = beforeStartSpan ? beforeStartSpan(transactionData) : transactionData;

    // If the transaction name was changed, mark the source as custom
    if (finalTransactionData.name !== transactionData.name) {
      finalTransactionData.metadata = {
        ...finalTransactionData.metadata,
        source: "custom"
      };
    } else {
      finalTransactionData.metadata = finalTransactionData.metadata;
    }

    // Update the current transaction context
    currentTransactionContext.name = finalTransactionData.name;
    currentTransactionContext.context = finalTransactionData;

    // If sampling is disabled, log and do not send
    if (finalTransactionData.sampled === false) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.log(`[Tracing] Will not send ${finalTransactionData.op} transaction because of beforeNavigate.`);
      }
    }

    if (bq.DEBUG_BUILD) {
      fJ.logger.log(`[Tracing] Starting ${finalTransactionData.op} transaction on scope`);
    }

    const { location } = oW.WINDOW;
    const idleTransaction = HQ.startIdleTransaction(
      currentHub,
      finalTransactionData,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      heartbeatInterval,
      isPageLoad
    );

    // For pageload, auto-finish the transaction when the document is ready
    if (isPageLoad && oW.WINDOW.document) {
      oW.WINDOW.document.addEventListener("readystatechange", () => {
        if (["interactive", "complete"].includes(oW.WINDOW.document.readyState)) {
          idleTransaction.sendAutoFinishSignal();
        }
      });
      if (["interactive", "complete"].includes(oW.WINDOW.document.readyState)) {
        idleTransaction.sendAutoFinishSignal();
      }
    }

    // Register a callback to add performance entries and stop web vitals tracking before finishing
    idleTransaction.registerBeforeFinishCallback(() => {
      stopWebVitalsTracking();
      kc.addPerformanceEntries(idleTransaction);
    });

    return idleTransaction;
  }

  return {
    name: iIA, // Integration name constant
    setupOnce: () => {}, // No-op for compatibility

    /**
     * Called after all integrations are set up. Sets up event listeners and outgoing request instrumentation.
     *
     * @param {Object} integrationAPI - The integration API from Sentry SDK
     */
    afterAllSetup(integrationAPI) {
      const integrationOptions = integrationAPI.getOptions();
      const {
        markBackgroundSpan,
        traceFetch,
        traceXHR,
        shouldCreateSpanForRequest,
        enableHTTPTimings,
        _experiments
      } = tracingOptions;
      const topLevelTracePropagationTargets = integrationOptions && integrationOptions.tracePropagationTargets;
      const effectiveTracePropagationTargets = topLevelTracePropagationTargets || tracingOptions.tracePropagationTargets;

      // Warn if both integration and top-level tracePropagationTargets are set
      if (bq.DEBUG_BUILD && shouldDebugTracePropagation && topLevelTracePropagationTargets) {
        fJ.logger.warn("[Tracing] The `tracePropagationTargets` option was set in the BrowserTracing integration and top level `Sentry.init`. The top level `Sentry.init` value is being used.");
      }

      let currentIdleTransaction;
      let lastLocationHref = oW.WINDOW.location && oW.WINDOW.location.href;

      // Listen for navigation and pageload span events
      if (integrationAPI.on) {
        integrationAPI.on("startNavigationSpan", navigationContext => {
          if (currentIdleTransaction) {
            if (bq.DEBUG_BUILD) {
              fJ.logger.log(`[Tracing] Finishing current transaction with op: ${HQ.spanToJSON(currentIdleTransaction).op}`);
            }
            currentIdleTransaction.end();
          }
          currentIdleTransaction = startIdleTransactionWithContext({
            op: "navigation",
            ...navigationContext
          });
        });
        integrationAPI.on("startPageLoadSpan", pageLoadContext => {
          if (currentIdleTransaction) {
            if (bq.DEBUG_BUILD) {
              fJ.logger.log(`[Tracing] Finishing current transaction with op: ${HQ.spanToJSON(currentIdleTransaction).op}`);
            }
            currentIdleTransaction.end();
          }
          currentIdleTransaction = startIdleTransactionWithContext({
            op: "pageload",
            ...pageLoadContext
          });
        });
      }

      // Instrument initial page load if enabled
      if (tracingOptions.instrumentPageLoad && integrationAPI.emit && oW.WINDOW.location) {
        const pageLoadTransaction = {
          name: oW.WINDOW.location.pathname,
          startTimestamp: fJ.browserPerformanceTimeOrigin ? fJ.browserPerformanceTimeOrigin / 1000 : undefined,
          origin: "auto.pageload.browser",
          attributes: {
            [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
          }
        };
        emitStartPageLoadAndGetActivePageloadSpan(integrationAPI, pageLoadTransaction);
      }

      // Instrument navigation events if enabled
      if (tracingOptions.instrumentNavigation && integrationAPI.emit && oW.WINDOW.location) {
        fJ.addHistoryInstrumentationHandler(({ to, from }) => {
          // Ignore initial navigation if the location hasn'processRuleBeginHandlers changed
          if (from === undefined && lastLocationHref && lastLocationHref.indexOf(to) !== -1) {
            lastLocationHref = undefined;
            return;
          }
          // Only instrument if the location actually changed
          if (from !== to) {
            lastLocationHref = undefined;
            const navigationTransaction = {
              name: oW.WINDOW.location.pathname,
              origin: "auto.navigation.browser",
              attributes: {
                [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
              }
            };
            emitNavigationSpanAndGetActiveNavigationSpan(integrationAPI, navigationTransaction);
          }
        });
      }

      // Register background tab detection if enabled
      if (markBackgroundSpan) {
        EB9.registerBackgroundTabDetection();
      }

      // Register click action transaction handler if enabled via experiments
      if (_experiments.enableInteractions) {
        initializeClickActionTransactionHandler(tracingOptions, currentTransactionContext);
      }

      // Register INP transaction handler if enabled
      if (tracingOptions.enableInp) {
        MB9(inpTrackingState, currentTransactionContext);
      }

      // Instrument outgoing requests (fetch/XHR)
      lIA.instrumentOutgoingRequests({
        traceFetch,
        traceXHR,
        tracePropagationTargets: effectiveTracePropagationTargets,
        shouldCreateSpanForRequest,
        enableHTTPTimings
      });
    },

    options: tracingOptions
  };
}

module.exports = createBrowserTracingIntegration;