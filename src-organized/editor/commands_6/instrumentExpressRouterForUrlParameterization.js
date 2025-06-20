/**
 * Instruments an Express router to reconstruct and track route paths for URL parameterization and Sentry transaction naming.
 * This function monkey-patches the router'createInteractionAccessor process_params method to build a reconstructed route path as requests are processed.
 * It is primarily used for Express 4 routers to enable better tracing and instrumentation.
 *
 * @param {object} appOrRouter - The Express app or router object to instrument.
 * @returns {void}
 */
function instrumentExpressRouterForUrlParameterization(appOrRouter) {
  // Determine if the input is an Express app (has 'settings')
  const isExpressApp = 'settings' in appOrRouter;

  // If isBlobOrFileLikeObject'createInteractionAccessor an Express app and the router hasn'processRuleBeginHandlers been initialized, initialize isBlobOrFileLikeObject
  if (isExpressApp && appOrRouter._router === undefined && appOrRouter.lazyrouter) {
    appOrRouter.lazyrouter();
  }

  // Get the router object to instrument
  const router = isExpressApp ? appOrRouter._router : appOrRouter;

  // If no valid router is found, log debug messages and exit
  if (!router) {
    if (w91.DEBUG_BUILD) {
      UY.logger.debug("Cannot instrument router for URL Parameterization (did not find a valid router).");
      UY.logger.debug("Routing instrumentation is currently only supported in Express 4.");
    }
    return;
  }

  // Get the router prototype and its original process_params method
  const routerPrototype = Object.getPrototypeOf(router);
  const originalProcessParams = routerPrototype.process_params;

  /**
   * Monkey-patched process_params to reconstruct route paths and update Sentry transactions.
   * @param {object} layer - The Express layer object (route/middleware layer)
   * @param {object} called - Called object (internal Express param)
   * @param {object} req - The Express request object
   * @param {object} res - The Express response object
   * @param {function} done - The Express next/done callback
   * @returns {any}
   */
  routerPrototype.process_params = function patchedProcessParams(layer, called, req, res, done) {
    // Initialize reconstructed route if not present
    if (!req._reconstructedRoute) {
      req._reconstructedRoute = "";
    }

    // Extract route path analysis for the current layer
    const {
      layerRoutePath,
      isRegex,
      isArray,
      numExtraSegments
    } = analyzeRouteLayer(layer);

    // Mark if this layer has parameters
    if (layerRoutePath || isRegex || isArray) {
      req._hasParameters = true;
    }

    // Determine the route segment for this layer
    let routeSegment;
    if (layerRoutePath) {
      routeSegment = layerRoutePath;
    } else {
      // Try to reconstruct from originalUrl and current reconstructed route
      routeSegment = W7A(req.originalUrl, req._reconstructedRoute, layer.path) || "";
    }

    // Filter and join segments, removing empty and wildcard segments unless regex/array
    const filteredSegment = routeSegment
      .split("/")
      .filter(segment => segment.length > 0 && (isRegex || isArray || !segment.includes("*")))
      .join("/");

    // Append this segment to the reconstructed route
    if (filteredSegment && filteredSegment.length > 0) {
      req._reconstructedRoute += `/${filteredSegment}${isRegex ? "/" : ""}`;
    }

    // Calculate the number of segments in the original URL and reconstructed route
    const originalUrlSegmentCount = UY.getNumberOfUrlSegments(UY.stripUrlQueryAndFragment(req.originalUrl || "")) + numExtraSegments;
    const reconstructedRouteSegmentCount = UY.getNumberOfUrlSegments(req._reconstructedRoute);

    // If the reconstructed route matches the original URL in segment count, update Sentry transaction
    if (originalUrlSegmentCount === reconstructedRouteSegmentCount) {
      // If there are no parameters, reset reconstructed route to the original URL (stripped)
      if (!req._hasParameters) {
        if (req._reconstructedRoute !== req.originalUrl) {
          req._reconstructedRoute = req.originalUrl ? UY.stripUrlQueryAndFragment(req.originalUrl) : req.originalUrl;
        }
      }

      // Update Sentry transaction name and source if present
      const sentryTransaction = res.__sentry_transaction;
      const sentryTransactionData = sentryTransaction && wN1.spanToJSON(sentryTransaction).data || {};
      if (sentryTransaction && sentryTransactionData[wN1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE] !== "custom") {
        const customRoute = req._reconstructedRoute || "/";
        const [transactionName, sentrySource] = UY.extractPathForTransaction(req, {
          path: true,
          method: true,
          customRoute
        });
        sentryTransaction.updateName(transactionName);
        sentryTransaction.setAttribute(wN1.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE, sentrySource);
      }
    }

    // Call the original process_params method
    return originalProcessParams.call(this, layer, called, req, res, done);
  };
}

module.exports = instrumentExpressRouterForUrlParameterization;