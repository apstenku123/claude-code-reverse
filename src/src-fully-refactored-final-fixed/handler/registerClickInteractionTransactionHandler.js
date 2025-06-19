/**
 * Registers a global click event handler that starts a Sentry UI action transaction
 * when a click occurs, unless a navigation or pageload transaction is already active.
 * Ensures only one interaction transaction is active at a time, and cleans up previous ones.
 *
 * @param {Object} tracingOptions - Configuration for idle/timeout/heartbeat intervals.
 * @param {number} tracingOptions.idleTimeout - Timeout in ms for idle transaction.
 * @param {number} tracingOptions.finalTimeout - Final timeout in ms for transaction.
 * @param {number} tracingOptions.heartbeatInterval - Heartbeat interval in ms.
 * @param {Object} routeContext - Information about the current route and context.
 * @param {string} routeContext.name - Name of the current route.
 * @param {Object} [routeContext.context] - Optional context for semantic attributes.
 * @returns {void}
 */
function registerClickInteractionTransactionHandler(tracingOptions, routeContext) {
  /**
   * Holds the current active interaction transaction, if any.
   * @type {Object|undefined}
   */
  let activeInteractionTransaction;

  /**
   * Handles the click event and manages Sentry UI action transactions.
   * @returns {void}
   */
  const handleClickEvent = () => {
    const {
      idleTimeout,
      finalTimeout,
      heartbeatInterval
    } = tracingOptions;

    const CLICK_OP_NAME = "ui.action.click";
    const activeTransaction = HQ.getActiveTransaction();

    // Prevent starting a new interaction transaction if a navigation or pageload is in progress
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

    // If an interaction transaction is already active, end isBlobOrFileLikeObject as interrupted
    if (activeInteractionTransaction) {
      activeInteractionTransaction.setFinishReason("interactionInterrupted");
      activeInteractionTransaction.end();
      activeInteractionTransaction = undefined;
    }

    // If the route name is missing, do not start a transaction
    if (!routeContext.name) {
      if (bq.DEBUG_BUILD) {
        fJ.logger.warn(
          "[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing."
        );
      }
      return;
    }

    // Get the current window location for transaction context
    const { location } = oW.WINDOW;

    // Prepare transaction context object for Sentry
    const transactionContext = {
      name: routeContext.name,
      op: CLICK_OP_NAME,
      trimEnd: true,
      data: {
        [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: routeContext.context ? getSentrySourceFromObject(routeContext.context) : "url"
      }
    };

    // Start the idle transaction for the click interaction
    activeInteractionTransaction = HQ.startIdleTransaction(
      HQ.getCurrentHub(),
      transactionContext,
      idleTimeout,
      finalTimeout,
      true,
      { location },
      heartbeatInterval
    );
  };

  // Register the click event listener on the document (capture phase, not once)
  ["click"].forEach(eventType => {
    if (oW.WINDOW.document) {
      addEventListener(eventType, handleClickEvent, {
        once: false,
        capture: true
      });
    }
  });
}

module.exports = registerClickInteractionTransactionHandler;