/**
 * Processes transaction metadata by extracting relevant properties from the configuration object
 * and invoking corresponding handler functions for each property. Handles starting a UI interaction
 * transaction if a span is present.
 *
 * @param {Object} sourceObservable - The source observable or transaction object to process.
 * @param {Object} config - Configuration object containing transaction metadata.
 * @param {string} [config.fingerprint] - Unique identifier for the transaction.
 * @param {Object} [config.span] - Span object representing a UI interaction or trace.
 * @param {Array} [config.breadcrumbs] - List of breadcrumbs for tracing events.
 * @param {Object} [config.sdkProcessingMetadata] - Additional SDK processing metadata.
 * @returns {void}
 */
function processTransactionMetadata(sourceObservable, config) {
  const {
    fingerprint: transactionFingerprint,
    span: interactionSpan,
    breadcrumbs: eventBreadcrumbs,
    sdkProcessingMetadata: sdkMetadata
  } = config;

  // Always process the source observable and config
  mergeEventDataFromConfig(sourceObservable, config);

  // If a span is present, start a new UI interaction transaction
  if (interactionSpan) {
    enrichEventWithTracingContext(sourceObservable, interactionSpan);
  }

  // Process transaction fingerprint
  updateFingerprintProperty(sourceObservable, transactionFingerprint);

  // Process event breadcrumbs
  updateBreadcrumbs(sourceObservable, eventBreadcrumbs);

  // Process SDK processing metadata
  mergeSdkProcessingMetadata(sourceObservable, sdkMetadata);
}

module.exports = processTransactionMetadata;