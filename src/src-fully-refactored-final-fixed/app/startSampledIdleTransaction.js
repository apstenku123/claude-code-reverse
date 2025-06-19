/**
 * Starts a sampled idle transaction, initializes span recording, and emits a start event if applicable.
 *
 * @param {object} sourceObservable - The source object providing the client (must implement getClient()).
 * @param {object} transactionContext - Context for the transaction, including name, parentSampled, data, and attributes.
 * @param {object} transactionOptions - Additional options for the transaction (passed to IdleTransaction constructor).
 * @param {object} uiActionHandler - Handler for UI action click transactions.
 * @param {object} globalConfig - Global configuration or context object.
 * @param {object} additionalAttributes - Additional attributes to merge into the transaction context.
 * @param {object} recentInputProcessor - Processor for recent input entries.
 * @param {boolean} [isReplayTransaction=false] - Indicates if this is a replay transaction.
 * @returns {object} The initialized (and possibly sampled) IdleTransaction instance.
 */
function startSampledIdleTransaction(
  sourceObservable,
  transactionContext,
  transactionOptions,
  uiActionHandler,
  globalConfig,
  additionalAttributes,
  recentInputProcessor,
  isReplayTransaction = false
) {
  // Retrieve the client from the source observable
  const client = sourceObservable.getClient();

  // Get options from the client, or use an empty object if unavailable
  const clientOptions = (client && client.getOptions()) || {};

  // Create a new IdleTransaction instance
  let idleTransaction = new He2.IdleTransaction(
    transactionContext,
    sourceObservable,
    transactionOptions,
    uiActionHandler,
    recentInputProcessor,
    globalConfig,
    isReplayTransaction
  );

  // Sample the transaction using hBA.sampleTransaction, merging in attributes and additionalAttributes
  idleTransaction = hBA.sampleTransaction(idleTransaction, clientOptions, {
    name: transactionContext.name,
    parentSampled: transactionContext.parentSampled,
    transactionContext: transactionContext,
    attributes: {
      ...transactionContext.data,
      ...transactionContext.attributes
    },
    ...additionalAttributes
  });

  // If the transaction is recording, initialize the span recorder with the maxSpans experiment value (if present)
  if (idleTransaction.isRecording()) {
    idleTransaction.initSpanRecorder(
      clientOptions._experiments && clientOptions._experiments.maxSpans
    );
  }

  // Emit a 'startTransaction' event if the client supports isBlobOrFileLikeObject
  if (client && client.emit) {
    client.emit("startTransaction", idleTransaction);
  }

  return idleTransaction;
}

module.exports = startSampledIdleTransaction;
