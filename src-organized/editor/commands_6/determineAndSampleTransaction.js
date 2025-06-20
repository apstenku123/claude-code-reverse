/**
 * Determines if a transaction should be sampled based on tracing configuration and context, 
 * sets the appropriate sample rate attribute, and logs decisions in debug mode.
 *
 * @param {Object} transaction - The transaction object to be sampled and annotated.
 * @param {Object} tracingConfig - The tracing configuration object (may contain tracesSampler, tracesSampleRate, etc).
 * @param {Object} samplingContext - Contextual information for sampling (may include parentSampled, etc).
 * @returns {Object} The transaction object, possibly modified with sampling decision and attributes.
 */
function determineAndSampleTransaction(transaction, tracingConfig, samplingContext) {
  // If tracing is not enabled, mark as not sampled and return
  if (!Ze2.hasTracingEnabled(tracingConfig)) {
    transaction.sampled = false;
    return transaction;
  }

  // If already sampled, set the sample rate attribute and return
  if (transaction.sampled !== undefined) {
    transaction.setAttribute(I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(transaction.sampled));
    return transaction;
  }

  let sampleRate;

  // Determine sample rate from config or context
  if (typeof tracingConfig.tracesSampler === "function") {
    // Use custom sampler function if provided
    sampleRate = tracingConfig.tracesSampler(samplingContext);
    transaction.setAttribute(I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(sampleRate));
  } else if (samplingContext.parentSampled !== undefined) {
    // Inherit sampling decision from parent if available
    sampleRate = samplingContext.parentSampled;
  } else if (typeof tracingConfig.tracesSampleRate !== "undefined") {
    // Use static sample rate from config
    sampleRate = tracingConfig.tracesSampleRate;
    transaction.setAttribute(I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE, Number(sampleRate));
  } else {
    // Default to always sample if nothing specified
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

  // If sample rate is falsy (0, false, etc), discard transaction
  if (!sampleRate) {
    if (sy.DEBUG_BUILD) {
      const reason = typeof tracingConfig.tracesSampler === "function"
        ? "tracesSampler returned 0 or false"
        : "a negative sampling decision was inherited or tracesSampleRate is set to 0";
      BP.logger.log(`[Tracing] Discarding transaction because ${reason}`);
    }
    transaction.sampled = false;
    return transaction;
  }

  // Perform random sampling
  transaction.sampled = Math.random() < sampleRate;
  if (!transaction.sampled) {
    if (sy.DEBUG_BUILD) {
      BP.logger.log(`[Tracing] Discarding transaction because isBlobOrFileLikeObject'createInteractionAccessor not included in the random sample (sampling rate = ${Number(sampleRate)})`);
    }
    return transaction;
  }

  // Log the start of the transaction in debug mode
  if (sy.DEBUG_BUILD) {
    BP.logger.log(`[Tracing] starting ${transaction.op} transaction - ${De2.spanToJSON(transaction).description}`);
  }

  return transaction;
}

module.exports = determineAndSampleTransaction;