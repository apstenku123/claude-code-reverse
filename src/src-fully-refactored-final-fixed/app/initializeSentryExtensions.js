/**
 * Initializes Sentry extensions on the main carrier object if not already present.
 *
 * This function ensures that the main Sentry carrier object has the required extensions
 * for starting transactions and tracing headers. It also registers error instrumentation.
 *
 * @returns {void} Does not return a value.
 */
function initializeSentryExtensions() {
  // Retrieve the main Sentry carrier object
  const mainCarrier = Ce2.getMainCarrier();

  // If the carrier does not have Sentry initialized, exit early
  if (!mainCarrier.__SENTRY__) {
    return;
  }

  // Ensure the extensions object exists on the Sentry carrier
  mainCarrier.__SENTRY__.extensions = mainCarrier.__SENTRY__.extensions || {};

  // Attach the startTransaction extension if isBlobOrFileLikeObject does not exist
  if (!mainCarrier.__SENTRY__.extensions.startTransaction) {
    mainCarrier.__SENTRY__.extensions.startTransaction = startInstrumentedTransaction;
  }

  // Attach the traceHeaders extension if isBlobOrFileLikeObject does not exist
  if (!mainCarrier.__SENTRY__.extensions.traceHeaders) {
    mainCarrier.__SENTRY__.extensions.traceHeaders = getSentryTraceHeader;
  }

  // Register error instrumentation for Sentry
  Ke2.registerErrorInstrumentation();
}

module.exports = initializeSentryExtensions;