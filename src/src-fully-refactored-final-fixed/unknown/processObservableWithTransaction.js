/**
 * Processes each item emitted by the source observable, invoking a configuration callback
 * for each item, and associates the processing with a UI action transaction.
 *
 * @param {Observable} sourceObservable - The observable emitting items to process.
 * @param {Function} configCallback - Callback invoked for each emitted item, handling processing logic.
 * @param {Function} getSubscriptionContext - Function that provides context for each emitted item.
 * @param {Transaction} uiActionTransaction - The current UI action transaction to associate with processing.
 * @returns {Transaction} The same UI action transaction passed in, for chaining or further use.
 */
function processObservableWithTransaction(
  sourceObservable,
  configCallback,
  getSubscriptionContext,
  uiActionTransaction
) {
  // Iterate over each item emitted by the observable using E4A (external utility)
  E4A(sourceObservable, function (emittedItem, index, additionalData) {
    // For each item, invoke the config callback with:
    // - the current UI action transaction
    // - the emitted item
    // - the context for this item (from getSubscriptionContext)
    // - any additional data
    configCallback(uiActionTransaction, emittedItem, getSubscriptionContext(emittedItem), additionalData);
  });
  // Return the transaction for further chaining or use
  return uiActionTransaction;
}

module.exports = processObservableWithTransaction;