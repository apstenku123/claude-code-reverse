/**
 * Determines if a transaction should be sampled based on configuration and context, applies sampling rate as an attribute,
 * and logs relevant information for debugging. Returns the transaction with updated sampling decision.
 *
 * @param {Object} transaction - The transaction/span object to be sampled and annotated.
 * @param {Object} tracingConfig - The configuration object containing sampling logic and rates.
 * @param {Object} samplingContext - Contextual information about the transaction (e.g., parent sampling decision).
 * @returns {Object} The transaction object with updated sampling decision and attributes.
 */
function determineAndApplyTransactionSampling(transaction, tracingConfig, samplingContext) {
  // If tracing is not enabled for this config, mark as not sampled and return
  if (!Ze2.hasTracingEnabled(tracingConfig)) {
    transaction.sampled = false;
    return transaction;
  }

  // If sampling decision already exists, set the sample rate attribute and return
  if (transaction.sampled !== undefined) {
    transaction.setAttribute(I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(transaction.sampled));
    return transaction;
  }

  let sampleRate;

  // Determine sample rate from tracesSampler function, parentSampled, or tracesSampleRate config
  if (typeof tracingConfig.tracesSampler === "function") {
    sampleRate = tracingConfig.tracesSampler(samplingContext);
    transaction.setAttribute(I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(sampleRate));
  } else if (samplingContext.parentSampled !== undefined) {
    sampleRate = samplingContext.parentSampled;
  } else if (typeof tracingConfig.tracesSampleRate !== "undefined") {
    sampleRate = tracingConfig.tracesSampleRate;
    transaction.setAttribute(I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(sampleRate));
  } else {
    // Default sample rate is 1 (always sample)
    sampleRate = 1;
    transaction.setAttribute(I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, sampleRate);
  }

  // Validate the sample rate
  if (!isValidSampleRate(sampleRate)) {
    if (sy.DEBUG_BUILD) {
      BP.logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
    }
    transaction.sampled = false;
    return transaction;
  }

  // If sample rate is falsy (0, false, etc.), discard transaction
  if (!sampleRate) {
    if (sy.DEBUG_BUILD) {
      BP.logger.log(`[Tracing] Discarding transaction because ${
        typeof tracingConfig.tracesSampler === "function"
          ? "tracesSampler returned 0 or false"
          : "a negative sampling decision was inherited or tracesSampleRate is set to 0"
      }`);
    }
    transaction.sampled = false;
    return transaction;
  }

  // Make the sampling decision based on random number and sample rate
  transaction.sampled = Math.random() < sampleRate;
  if (!transaction.sampled) {
    if (sy.DEBUG_BUILD) {
      BP.logger.log(
        `[Tracing] Discarding transaction because isBlobOrFileLikeObject'createInteractionAccessor not included in the random sample (sampling rate = ${Number(sampleRate)})`
      );
    }
    return transaction;
  }

  // Log transaction start if in debug mode
  if (sy.DEBUG_BUILD) {
    BP.logger.log(
      `[Tracing] starting ${transaction.op} transaction - ${De2.spanToJSON(transaction).description}`
    );
  }

  return transaction;
}

module.exports = determineAndApplyTransactionSampling;