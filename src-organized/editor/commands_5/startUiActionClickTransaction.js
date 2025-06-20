/**
 * Starts a new 'ui.action.click' idle transaction if no navigation or pageload transaction is active.
 * Ends any existing interaction transaction, and ensures required route information is present.
 *
 * @function startUiActionClickTransaction
 * @description Initiates a Sentry idle transaction for a UI click action, unless a navigation or pageload transaction is already running. Cleans up any previous interaction transaction and validates necessary context before starting a new one.
 * @returns {void} Does not return a value.
 */
const startUiActionClickTransaction = () => {
  // Destructure timeouts and intervals from the source observable configuration
  const {
    idleTimeout,
    finalTimeout,
    heartbeatInterval
  } = sourceObservable;

  const transactionOperation = "ui.action.click";
  const activeTransaction = HQ.getActiveTransaction();

  // Prevent starting a new transaction if a navigation or pageload transaction is already active
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

  // End any existing interaction transaction
  if (interactionTransaction) {
    interactionTransaction.setFinishReason("interactionInterrupted");
    interactionTransaction.end();
    interactionTransaction = undefined;
  }

  // Ensure the latest route name is present before starting a new transaction
  if (!routeConfig.name) {
    if (bq.DEBUG_BUILD) {
      fJ.logger.warn(
        "[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing."
      );
    }
    return;
  }

  // Get the current window location for transaction context
  const { location } = oW.WINDOW;

  // Prepare transaction context data
  const transactionContext = {
    name: routeConfig.name,
    op: transactionOperation,
    trimEnd: true,
    data: {
      [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: routeConfig.context
        ? getSentrySourceFromObject(routeConfig.context)
        : "url"
    }
  };

  // Start a new idle transaction for the UI action click
  interactionTransaction = HQ.startIdleTransaction(
    HQ.getCurrentHub(),
    transactionContext,
    idleTimeout,
    finalTimeout,
    true,
    { location },
    heartbeatInterval
  );
};

module.exports = startUiActionClickTransaction;