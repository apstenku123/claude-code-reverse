/**
 * Initializes tracing for UI click interactions by starting an idle transaction on each click event.
 * Prevents duplicate transactions if a navigation or pageload transaction is already in progress.
 *
 * @param {Object} tracingConfig - Configuration for idle and heartbeat timeouts.
 * @param {number} tracingConfig.idleTimeout - Timeout in ms before considering the transaction idle.
 * @param {number} tracingConfig.finalTimeout - Maximum duration in ms for the transaction.
 * @param {number} tracingConfig.heartbeatInterval - Interval in ms for sending heartbeat signals.
 * @param {Object} routeInfo - Information about the current route and context.
 * @param {string} routeInfo.name - The name of the current route.
 * @param {Object} [routeInfo.context] - Optional context for the route.
 * @returns {void}
 */
function initializeClickInteractionTracing(tracingConfig, routeInfo) {
  let activeClickTransaction;

  /**
   * Handles click events by starting a new idle transaction for UI action clicks.
   * Ensures that no navigation or pageload transaction is already in progress.
   * Cleans up any previous click transaction before starting a new one.
   * @private
   */
  const handleClick = () => {
    const {
      idleTimeout,
      finalTimeout,
      heartbeatInterval
    } = tracingConfig;

    const CLICK_OPERATION = "ui.action.click";
    const currentTransaction = HQ.getActiveTransaction();

    // Prevent starting a new click transaction if a navigation or pageload transaction is active
    if (
      currentTransaction &&
      currentTransaction.op &&
      ["navigation", "pageload"].includes(currentTransaction.op)
    ) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.warn(
          "[Tracing] Did not create ui.action.click transaction because a pageload or navigation transaction is in progress."
        );
      }
      return;
    }

    // End any previous click transaction before starting a new one
    if (activeClickTransaction) {
      activeClickTransaction.setFinishReason("interactionInterrupted");
      activeClickTransaction.end();
      activeClickTransaction = undefined;
    }

    // Ensure route name is present before starting a transaction
    if (!routeInfo.name) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.warn(
          "[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing."
        );
      }
      return;
    }

    const { location } = oW.WINDOW;
    const transactionContext = {
      name: routeInfo.name,
      op: CLICK_OPERATION,
      trimEnd: true,
      data: {
        [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: routeInfo.context ? getSentrySourceFromObject(routeInfo.context) : "url"
      }
    };

    // Start a new idle transaction for the click interaction
    activeClickTransaction = HQ.startIdleTransaction(
      HQ.getCurrentHub(),
      transactionContext,
      idleTimeout,
      finalTimeout,
      true, // always wait for children
      { location },
      heartbeatInterval
    );
  };

  // Attach the click event listener to the document (capture phase, not once)
  ["click"].forEach(eventType => {
    if (oW.WINDOW.document) {
      addEventListener(eventType, handleClick, {
        once: false,
        capture: true
      });
    }
  });
}

module.exports = initializeClickInteractionTracing;
