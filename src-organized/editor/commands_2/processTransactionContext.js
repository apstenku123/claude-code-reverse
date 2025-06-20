/**
 * Processes and attaches transaction context details such as fingerprint, span, breadcrumbs, and SDK processing metadata
 * to the given source observable. This function ensures all relevant context is properly handled for tracing or monitoring purposes.
 *
 * @param {object} sourceObservable - The observable or transaction object to which context will be attached.
 * @param {object} contextConfig - The configuration object containing context details.
 * @param {string} [contextConfig.fingerprint] - Unique identifier for the transaction or event.
 * @param {object} [contextConfig.span] - Span object representing the current operation or trace segment.
 * @param {Array} [contextConfig.breadcrumbs] - List of breadcrumbs for event tracing.
 * @param {object} [contextConfig.sdkProcessingMetadata] - Additional SDK processing metadata.
 * @returns {void}
 */
function processTransactionContext(sourceObservable, contextConfig) {
  const {
    fingerprint: transactionFingerprint,
    span: transactionSpan,
    breadcrumbs: eventBreadcrumbs,
    sdkProcessingMetadata: sdkMetadata
  } = contextConfig;

  // Ensure any unfinished activity is added to the stack
  mergeEventDataFromConfig(sourceObservable, contextConfig);

  // If a span is present, start a UI action click transaction
  if (transactionSpan) {
    enrichEventWithTracingContext(sourceObservable, transactionSpan);
  }

  // Attach fingerprint, breadcrumbs, and SDK metadata to the observable
  updateFingerprintProperty(sourceObservable, transactionFingerprint);
  updateBreadcrumbs(sourceObservable, eventBreadcrumbs);
  mergeSdkProcessingMetadata(sourceObservable, sdkMetadata);
}

module.exports = processTransactionContext;
