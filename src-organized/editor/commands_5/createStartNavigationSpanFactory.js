/**
 * Factory function to create and configure navigation and pageload span tracking for Sentry browser tracing.
 * Sets up instrumentation for web vitals, INP, long tasks, interactions, outgoing requests, and navigation events.
 * Handles propagation targets, tracing origins, and integrates with Sentry'createInteractionAccessor transaction system.
 *
 * @param {Object} [userOptions={}] - Configuration options for browser tracing integration.
 * @returns {Object} An object with integration name, setupOnce, afterAllSetup, and options.
 */
function createStartNavigationSpanFactory(userOptions = {}) {
  // Determine if handleMissingDoctypeError should warn about trace propagation targets
  const shouldWarnAboutPropagationTargets = bq.DEBUG_BUILD
    ? Boolean(userOptions.tracePropagationTargets || userOptions.tracingOrigins)
    : false;

  // Ensure tracing extensions are added
  HQ.addTracingExtensions();

  // Backwards compatibility: if tracingOrigins is set but tracePropagationTargets is not, copy isBlobOrFileLikeObject over
  if (!userOptions.tracePropagationTargets && userOptions.tracingOrigins) {
    userOptions.tracePropagationTargets = userOptions.tracingOrigins;
  }

  // Merge default options with user-provided options
  const options = {
    ...UB9, // Default options
    ...userOptions
  };

  // Start tracking web vitals (returns a cleanup function)
  const stopTrackingWebVitals = kc.startTrackingWebVitals();

  // Used for INP instrumentation
  const inpInteractionData = {};

  // Optionally start INP tracking
  if (options.enableInp) {
    kc.startTrackingINP(inpInteractionData, options.interactionsSampleRate);
  }

  // Optionally start long task tracking
  if (options.enableLongTask) {
    kc.startTrackingLongTasks();
  }

  // Optionally start interaction tracking (experimental)
  if (options._experiments.enableInteractions) {
    kc.startTrackingInteractions();
  }

  // Holds the most recent transaction name and context
  const currentTransactionContext = {
    name: undefined,
    context: undefined
  };

  /**
   * Creates and starts a new idle transaction for navigation or pageload.
   * Handles propagation context, beforeStartSpan hooks, and auto-finishing logic.
   *
   * @param {Object} transactionContext - Context for the transaction (op, name, metadata, etc.)
   * @returns {Object} The started idle transaction
   */
  function startNavigationOrPageloadTransaction(transactionContext) {
    const hub = HQ.getCurrentHub();
    const {
      beforeStartSpan,
      idleTimeout,
      finalTimeout,
      heartbeatInterval
    } = options;
    const isPageload = transactionContext.op === "pageload";
    let transactionData;

    if (isPageload) {
      // Extract propagation headers for pageload
      const sentryTraceHeader = isPageload ? fN1("sentry-trace") : "";
      const baggageHeader = isPageload ? fN1("baggage") : undefined;
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

    // Allow user to modify transaction data before starting
    const finalTransactionData = beforeStartSpan ? beforeStartSpan(transactionData) : transactionData;

    // If the transaction name was changed, mark the source as custom
    if (finalTransactionData.metadata && finalTransactionData.name !== transactionData.name) {
      finalTransactionData.metadata = {
        ...finalTransactionData.metadata,
        source: "custom"
      };
    }

    // Store current transaction context for later use
    currentTransactionContext.name = finalTransactionData.name;
    currentTransactionContext.context = finalTransactionData;

    // If transaction is not sampled, log and skip
    if (finalTransactionData.sampled === false) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.log(`[Tracing] Will not send ${finalTransactionData.op} transaction because of beforeNavigate.`);
      }
    }

    if (bq.DEBUG_BUILD) {
      fJ.logger.log(`[Tracing] Starting ${finalTransactionData.op} transaction on scope`);
    }

    // Get current location for transaction context
    const { location } = oW.WINDOW;

    // Start the idle transaction
    const idleTransaction = HQ.startIdleTransaction(
      hub,
      finalTransactionData,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      heartbeatInterval,
      isPageload
    );

    // For pageload, auto-finish the transaction when the document is ready
    if (isPageload && oW.WINDOW.document) {
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
      stopTrackingWebVitals();
      kc.addPerformanceEntries(idleTransaction);
    });

    return idleTransaction;
  }

  return {
    name: iIA, // Integration name
    setupOnce: () => {}, // No-op for setupOnce
    /**
     * Sets up event listeners and outgoing request instrumentation after all integrations are set up.
     * Handles navigation, pageload, click actions, outgoing requests, and background tab detection.
     *
     * @param {Object} integrationAPI - The Sentry integration API instance
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
      } = options;
      const topLevelPropagationTargets = integrationOptions && integrationOptions.tracePropagationTargets;
      const effectivePropagationTargets = topLevelPropagationTargets || options.tracePropagationTargets;

      // Warn if both integration and top-level propagation targets are set
      if (bq.DEBUG_BUILD && shouldWarnAboutPropagationTargets && topLevelPropagationTargets) {
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
          currentIdleTransaction = startNavigationOrPageloadTransaction({
            op: "navigation",
            ...navigationContext
          });
        });
        integrationAPI.on("startPageLoadSpan", pageloadContext => {
          if (currentIdleTransaction) {
            if (bq.DEBUG_BUILD) {
              fJ.logger.log(`[Tracing] Finishing current transaction with op: ${HQ.spanToJSON(currentIdleTransaction).op}`);
            }
            currentIdleTransaction.end();
          }
          currentIdleTransaction = startNavigationOrPageloadTransaction({
            op: "pageload",
            ...pageloadContext
          });
        });
      }

      // Instrument initial pageload if enabled
      if (options.instrumentPageLoad && integrationAPI.emit && oW.WINDOW.location) {
        const pageloadTransactionContext = {
          name: oW.WINDOW.location.pathname,
          startTimestamp: fJ.browserPerformanceTimeOrigin ? fJ.browserPerformanceTimeOrigin / 1000 : undefined,
          origin: "auto.pageload.browser",
          attributes: {
            [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
          }
        };
        emitStartPageLoadAndGetActivePageloadSpan(integrationAPI, pageloadTransactionContext);
      }

      // Instrument navigation events if enabled
      if (options.instrumentNavigation && integrationAPI.emit && oW.WINDOW.location) {
        fJ.addHistoryInstrumentationHandler(({ to, from }) => {
          // Prevent duplicate navigation events on initial load
          if (from === undefined && lastLocationHref && lastLocationHref.indexOf(to) !== -1) {
            lastLocationHref = undefined;
            return;
          }
          if (from !== to) {
            lastLocationHref = undefined;
            const navigationTransactionContext = {
              name: oW.WINDOW.location.pathname,
              origin: "auto.navigation.browser",
              attributes: {
                [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: "url"
              }
            };
            emitNavigationSpanAndGetActiveNavigationSpan(integrationAPI, navigationTransactionContext);
          }
        });
      }

      // Register background tab detection if enabled
      if (markBackgroundSpan) {
        EB9.registerBackgroundTabDetection();
      }

      // Enable experimental interaction tracking if enabled
      if (_experiments.enableInteractions) {
        initializeClickActionTransactionHandler(options, currentTransactionContext);
      }

      // Enable INP instrumentation if enabled
      if (options.enableInp) {
        MB9(inpInteractionData, currentTransactionContext);
      }

      // Instrument outgoing HTTP requests
      lIA.instrumentOutgoingRequests({
        traceFetch,
        traceXHR,
        tracePropagationTargets: effectivePropagationTargets,
        shouldCreateSpanForRequest,
        enableHTTPTimings
      });
    },
    options
  };
}

module.exports = createStartNavigationSpanFactory;