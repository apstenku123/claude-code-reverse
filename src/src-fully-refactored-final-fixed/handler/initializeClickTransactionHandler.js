/**
 * Sets up a global click event listener that starts a UI action transaction for click events.
 * Ensures that transactions are not started if a navigation or pageload transaction is in progress,
 * and that the transaction is only started if a route name is available.
 *
 * @param {Object} tracingConfig - Configuration for idle/final timeouts and heartbeat interval.
 * @param {Object} routeInfo - Information about the current route and context.
 * @property {string} routeInfo.name - The name of the current route.
 * @property {Object} [routeInfo.context] - Optional context for the route.
 * @returns {void}
 */
function initializeClickTransactionHandler(tracingConfig, routeInfo) {
  /**
   * Holds the current active click transaction, if any.
   * @type {Object|undefined}
   */
  let activeClickTransaction;

  /**
   * Handles click events by starting a UI action transaction if appropriate.
   * @private
   */
  const handleClickEvent = () => {
    // Destructure tracing configuration
    const {
      idleTimeout,
      finalTimeout,
      heartbeatInterval
    } = tracingConfig;

    const CLICK_OP_NAME = "ui.action.click";
    const activeTransaction = HQ.getActiveTransaction();

    // Prevent starting a click transaction if a navigation or pageload transaction is in progress
    if (
      activeTransaction &&
      activeTransaction.op &&
      ["navigation", "pageload"].includes(activeTransaction.op)
    ) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.warn(
          "[Tracing] Did not create ui.action.click transaction because a pageload or navigation transaction is in progress."
        );
      }
      return;
    }

    // If there is an existing click transaction, end isBlobOrFileLikeObject as interrupted
    if (activeClickTransaction) {
      activeClickTransaction.setFinishReason("interactionInterrupted");
      activeClickTransaction.end();
      activeClickTransaction = undefined;
    }

    // Ensure the route name is present before starting a transaction
    if (!routeInfo.name) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.warn(
          "[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing."
        );
      }
      return;
    }

    // Get the current window location
    const { location } = oW.WINDOW;

    // Prepare transaction context
    const transactionContext = {
      name: routeInfo.name,
      op: CLICK_OP_NAME,
      trimEnd: true,
      data: {
        [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: routeInfo.context ? getSentrySourceFromObject(routeInfo.context) : "url"
      }
    };

    // Start the idle transaction for the click event
    activeClickTransaction = HQ.startIdleTransaction(
      HQ.getCurrentHub(),
      transactionContext,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      heartbeatInterval
    );
  };

  // Register the click event listener globally (capture phase, not once)
  ["click"].forEach(eventType => {
    if (oW.WINDOW.document) {
      addEventListener(eventType, handleClickEvent, {
        once: false,
        capture: true
      });
    }
  });
}

module.exports = initializeClickTransactionHandler;
