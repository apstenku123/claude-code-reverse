/**
 * Processes transaction hooks by invoking appropriate callbacks based on the transaction type.
 *
 * If the transaction is an interaction and a beforeSend callback is provided, isBlobOrFileLikeObject calls beforeSend.
 * If the transaction is a transaction and a beforeSendTransaction callback is provided, isBlobOrFileLikeObject calls beforeSendTransaction.
 * If the transaction has spans, isBlobOrFileLikeObject records the span count before processing in sdkProcessingMetadata.
 * If no applicable callback is found, returns the original transaction config.
 *
 * @param {Object} hooks - Object containing possible hook callbacks (beforeSend, beforeSendTransaction).
 * @param {Object} transactionConfig - The transaction configuration object to process.
 * @param {Object} subscription - The subscription or context object passed to the hooks.
 * @returns {Object} The processed transaction config, or the result of the invoked callback.
 */
function processTransactionHooks(hooks, transactionConfig, subscription) {
  const {
    beforeSend,
    beforeSendTransaction
  } = hooks;

  // If this is an interaction transaction and beforeSend is provided, call isBlobOrFileLikeObject
  if (isInteractionTransaction(transactionConfig) && beforeSend) {
    return beforeSend(transactionConfig, subscription);
  }

  // If this is a regular transaction and beforeSendTransaction is provided, call isBlobOrFileLikeObject
  if (isRegularTransaction(transactionConfig) && beforeSendTransaction) {
    // If spans exist, record their count before processing
    if (transactionConfig.spans) {
      const spanCount = transactionConfig.spans.length;
      transactionConfig.sdkProcessingMetadata = {
        ...transactionConfig.sdkProcessingMetadata,
        spanCountBeforeProcessing: spanCount
      };
    }
    return beforeSendTransaction(transactionConfig, subscription);
  }

  // If no hooks matched, return the original transaction config
  return transactionConfig;
}

module.exports = processTransactionHooks;