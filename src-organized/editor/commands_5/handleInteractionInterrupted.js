/**
 * Handles UI interaction interruptions by starting a new idle transaction on click events,
 * unless a navigation or pageload transaction is already in progress. Cleans up any existing
 * interrupted transaction before starting a new one. Ensures transactions are only started
 * when a valid route name is present.
 *
 * @param {Object} tracingConfig - Configuration for idle and heartbeat timeouts.
 * @param {number} tracingConfig.idleTimeout - The idle timeout for the transaction.
 * @param {number} tracingConfig.finalTimeout - The final timeout for the transaction.
 * @param {number} tracingConfig.heartbeatInterval - The interval for heartbeat checks.
 * @param {Object} routeInfo - Information about the current route/context.
 * @param {string} routeInfo.name - The name of the current route.
 * @param {Object} [routeInfo.context] - Optional context for the route.
 * @returns {void}
 */
function handleInteractionInterrupted(tracingConfig, routeInfo) {
  /**
   * Holds the current idle transaction if one is active.
   * @type {Object|undefined}
   */
  let activeIdleTransaction;

  /**
   * Event handler for click events that manages idle transactions.
   * Starts a new idle transaction unless a navigation or pageload transaction is in progress.
   * Cleans up any existing interrupted transaction.
   */
  const onClickHandler = () => {
    const {
      idleTimeout,
      finalTimeout,
      heartbeatInterval
    } = tracingConfig;

    const CLICK_OP_NAME = "ui.action.click";
    const activeTransaction = HQ.getActiveTransaction();

    // Prevent starting a new transaction if a navigation or pageload transaction is in progress
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

    // Clean up any existing idle transaction before starting a new one
    if (activeIdleTransaction) {
      activeIdleTransaction.setFinishReason("interactionInterrupted");
      activeIdleTransaction.end();
      activeIdleTransaction = undefined;
    }

    // Ensure handleMissingDoctypeError have a valid route name before starting a transaction
    if (!routeInfo.name) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.warn(
          "[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing."
        );
      }
      return;
    }

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

    // Start a new idle transaction for the click event
    activeIdleTransaction = HQ.startIdleTransaction(
      HQ.getCurrentHub(),
      transactionContext,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      heartbeatInterval
    );
  };

  // Attach the click event listener to the document (if available)
  ["click"].forEach(eventType => {
    if (oW.WINDOW.document) {
      addEventListener(eventType, onClickHandler, {
        once: false,
        capture: true
      });
    }
  });
}

module.exports = handleInteractionInterrupted;
