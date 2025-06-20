/**
 * Processes Sentry transaction context by extracting relevant metadata and invoking associated handlers.
 *
 * This function takes a source observable and a configuration object containing Sentry transaction context
 * such as fingerprint, span, breadcrumbs, and SDK processing metadata. It then calls the appropriate
 * handler functions to process each piece of context. If a span is present, isBlobOrFileLikeObject starts a UI action click transaction.
 *
 * @param {any} sourceObservable - The observable or event source to process.
 * @param {Object} config - Configuration object containing Sentry transaction context.
 * @param {string[]} [config.fingerprint] - Array of strings used for grouping events in Sentry.
 * @param {Object} [config.span] - The span object representing the current transaction or trace.
 * @param {Array} [config.breadcrumbs] - List of breadcrumbs for Sentry event logging.
 * @param {Object} [config.sdkProcessingMetadata] - Additional SDK processing metadata for Sentry.
 * @returns {void}
 */
function processSentryTransactionContext(sourceObservable, config) {
  const {
    fingerprint: eventFingerprint,
    span: transactionSpan,
    breadcrumbs: eventBreadcrumbs,
    sdkProcessingMetadata: sdkMetadata
  } = config;

  // Perform initial processing with the source observable and config
  mergeEventDataFromConfig(sourceObservable, config);

  // If a transaction span exists, start a UI action click transaction
  if (transactionSpan) {
    enrichEventWithTracingContext(sourceObservable, transactionSpan);
  }

  // Process event fingerprint for grouping
  updateFingerprintProperty(sourceObservable, eventFingerprint);

  // Process breadcrumbs for event logging
  updateBreadcrumbs(sourceObservable, eventBreadcrumbs);

  // Process additional SDK metadata
  mergeSdkProcessingMetadata(sourceObservable, sdkMetadata);
}

module.exports = processSentryTransactionContext;