/**
 * Sets up a global click event listener that starts a Sentry UI action transaction for each click event.
 * Prevents starting a new transaction if a navigation or pageload transaction is already in progress.
 *
 * @param {Object} tracingConfig - Configuration for idle/heartbeat/final timeouts.
 * @param {Object} routeInfo - Information about the current route and context.
 * @returns {void}
 */
function initializeClickActionTransactionHandler(tracingConfig, routeInfo) {
  /**
   * Holds the current active click transaction, if any.
   * @type {Object|undefined}
   */
  let activeClickTransaction;

  /**
   * Handles click events by starting a new Sentry UI action transaction if appropriate.
   * @returns {void}
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

    // If a navigation or pageload transaction is in progress, do not start a new click transaction
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

    // If route name is missing, do not start a transaction
    if (!routeInfo.name) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.warn(
          "[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing."
        );
      }
      return;
    }

    // Get current window location
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

    // Start a new idle transaction for this click
    activeClickTransaction = HQ.startIdleTransaction(
      HQ.getCurrentHub(),
      transactionContext,
      idleTimeout,
      finalTimeout,
      true, // true for heartbeat
      { location },
      heartbeatInterval
    );
  };

  // Register the click event listener globally, capturing phase
  ["click"].forEach(eventType => {
    if (oW.WINDOW.document) {
      addEventListener(eventType, handleClickEvent, {
        once: false,
        capture: true
      });
    }
  });
}

module.exports = initializeClickActionTransactionHandler;