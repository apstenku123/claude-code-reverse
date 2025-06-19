/**
 * Determines whether a tracing transaction should be sampled based on configuration and context.
 * Sets appropriate sampling attributes and logs debug information if enabled.
 *
 * @param {object} transaction - The transaction object to be sampled and annotated.
 * @param {object} tracingConfig - Configuration object containing sampling logic and rates.
 * @param {object} samplingContext - Contextual information for sampling decisions (e.g., parent sampling, request info).
 * @returns {object} The transaction object, annotated with sampling decision and attributes.
 */
function determineTransactionSampling(transaction, tracingConfig, samplingContext) {
  // If tracing is not enabled, mark as not sampled and return
  if (!Ze2.hasTracingEnabled(tracingConfig)) {
    transaction.sampled = false;
    return transaction;
  }

  // If sampling decision already exists, set sample rate attribute and return
  if (transaction.sampled !== undefined) {
    transaction.setAttribute(
      I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
      Number(transaction.sampled)
    );
    return transaction;
  }

  let sampleRate;

  // 1. Use tracesSampler function if provided
  if (typeof tracingConfig.tracesSampler === "function") {
    sampleRate = tracingConfig.tracesSampler(samplingContext);
    transaction.setAttribute(
      I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
      Number(sampleRate)
    );
  // 2. Inherit parent sampling decision if available
  } else if (samplingContext.parentSampled !== undefined) {
    sampleRate = samplingContext.parentSampled;
  // 3. Use static tracesSampleRate from config if defined
  } else if (typeof tracingConfig.tracesSampleRate !== "undefined") {
    sampleRate = tracingConfig.tracesSampleRate;
    transaction.setAttribute(
      I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
      Number(sampleRate)
    );
  // 4. Default to sample rate of 1 (always sample)
  } else {
    sampleRate = 1;
    transaction.setAttribute(
      I91.SEMANTIC_ATTRIBUTE_SENTRY_SAMPLE_RATE,
      sampleRate
    );
  }

  // Validate sample rate
  if (!isValidSampleRate(sampleRate)) {
    if (sy.DEBUG_BUILD) {
      BP.logger.warn("[Tracing] Discarding transaction because of invalid sample rate.");
    }
    transaction.sampled = false;
    return transaction;
  }

  // If sample rate is falsy (0, false), discard transaction
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

  // Make the random sampling decision
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

module.exports = determineTransactionSampling;