/**
 * Starts a new UI action click transaction for tracing user interactions, unless a navigation or pageload transaction is already in progress.
 * Ends any existing interaction transaction, and ensures the latest route name is available before starting a new transaction.
 *
 * @returns {void} Does not return a value. Side effects: may start or end transactions.
 */
function startClickInteractionTransaction() {
  // Destructure timeouts and intervals from the interaction configuration source
  const {
    idleTimeout,
    finalTimeout,
    heartbeatInterval
  } = sourceObservable;

  const CLICK_OPERATION = "ui.action.click";

  // Get the currently active transaction (if any)
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

  // If there is an existing interaction transaction, end isBlobOrFileLikeObject and clear the reference
  if (subscription) {
    subscription.setFinishReason("interactionInterrupted");
    subscription.end();
    subscription = undefined;
  }

  // Ensure the latest route name is available before starting a new transaction
  if (!config.name) {
    if (bq.DEBUG_BUILD) {
      fJ.logger.warn(
        "[Tracing] Did not create ui.action.click transaction because _latestRouteName is missing."
      );
    }
    return;
  }

  // Get the current window location for transaction context
  const { location } = oW.WINDOW;

  // Build the transaction context object
  const transactionContext = {
    name: config.name,
    op: CLICK_OPERATION,
    trimEnd: true,
    data: {
      [HQ.SEMANTIC_ATTRIBUTE_SENTRY_SOURCE]: config.context ? getSentrySourceFromObject(config.context) : "url"
    }
  };

  // Start a new idle transaction for the click interaction
  subscription = HQ.startIdleTransaction(
    HQ.getCurrentHub(),
    transactionContext,
    idleTimeout,
    finalTimeout,
    true,
    { location },
    heartbeatInterval
  );
}

module.exports = startClickInteractionTransaction;