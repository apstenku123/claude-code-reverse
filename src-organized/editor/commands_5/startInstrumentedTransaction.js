/**
 * Starts a new instrumented transaction, ensuring the instrumenter matches the SDK configuration.
 * If the instrumenter does not match, logs an error and prevents sampling.
 * Samples the transaction, initializes span recording if needed, and emits a start event.
 *
 * @param {Object} transactionContext - Context object describing the transaction (name, instrumenter, data, etc).
 * @param {Object} [additionalOptions={}] - Optional additional options to merge into the transaction sampling context.
 * @returns {Transaction} The created and (possibly sampled) Transaction instance.
 */
function startInstrumentedTransaction(transactionContext, additionalOptions = {}) {
  // Retrieve the current client instance
  const client = this.getClient();
  // Get options from the client, or use an empty object if unavailable
  const clientOptions = (client && client.getOptions()) || {};
  // Determine the instrumenter configured in the SDK (default to 'sentry')
  const sdkInstrumenter = clientOptions.instrumenter || "sentry";
  // Determine the instrumenter specified in the transaction context (default to 'sentry')
  const transactionInstrumenter = transactionContext.instrumenter || "sentry";

  // If the instrumenter does not match, log an error and prevent sampling
  if (sdkInstrumenter !== transactionInstrumenter) {
    if (Xe2.DEBUG_BUILD && Je2.logger && typeof Je2.logger.error === 'function') {
      Je2.logger.error(
        `a transaction was started with instrumenter=\`${transactionInstrumenter}\`, but the SDK is configured with the \`${sdkInstrumenter}\` instrumenter.\n` +
        `The transaction will not be sampled. Please use the ${sdkInstrumenter} instrumentation to start transactions.`
      );
    }
    transactionContext.sampled = false;
  }

  // Create a new Transaction instance with the provided context and current scope
  let transaction = new ze2.Transaction(transactionContext, this);

  // Sample the transaction using the provided options and context
  transaction = hBA.sampleTransaction(transaction, clientOptions, {
    name: transactionContext.name,
    parentSampled: transactionContext.parentSampled,
    transactionContext: transactionContext,
    attributes: {
      ...transactionContext.data,
      ...transactionContext.attributes
    },
    ...additionalOptions
  });

  // If the transaction is recording, initialize the span recorder with maxSpans from experiments (if set)
  if (transaction.isRecording()) {
    const maxSpans = clientOptions._experiments && clientOptions._experiments.maxSpans;
    transaction.initSpanRecorder(maxSpans);
  }

  // Emit a 'startTransaction' event if the client supports isBlobOrFileLikeObject
  if (client && typeof client.emit === 'function') {
    client.emit("startTransaction", transaction);
  }

  return transaction;
}

module.exports = startInstrumentedTransaction;