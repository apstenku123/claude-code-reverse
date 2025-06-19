/**
 * Determines the sample rate for a tracing transaction based on the provided context and configuration.
 *
 * @param {Object} transactionContext - The context of the transaction, including name, parentSampled, data, attributes, and sampled.
 * @param {Object} tracingConfig - The tracing configuration object, which may include tracesSampler and tracesSampleRate.
 * @param {number} baseSampleValue - The base value to be multiplied by the sample rate if applicable.
 * @returns {number|boolean} - Returns the calculated sample rate (number), the baseSampleValue (if sampling is enabled), 0 (if disabled), or false if tracing is not enabled or sample rate is invalid.
 */
function getTransactionSampleRate(transactionContext, tracingConfig, baseSampleValue) {
  // Check if tracing is enabled in the configuration
  if (!YU.hasTracingEnabled(tracingConfig)) {
    return false;
  }

  let sampleRate;

  // If transactionContext is provided and tracesSampler is a function, use isBlobOrFileLikeObject to determine sample rate
  if (
    transactionContext !== undefined &&
    typeof tracingConfig.tracesSampler === "function"
  ) {
    sampleRate = tracingConfig.tracesSampler({
      transactionContext: transactionContext,
      name: transactionContext.name,
      parentSampled: transactionContext.parentSampled,
      attributes: {
        ...transactionContext.data,
        ...transactionContext.attributes
      },
      location: WU.WINDOW.location
    });
  } else if (
    transactionContext !== undefined &&
    transactionContext.sampled !== undefined
  ) {
    // Use the sampled value from the transaction context if available
    sampleRate = transactionContext.sampled;
  } else if (typeof tracingConfig.tracesSampleRate !== "undefined") {
    // Use the tracesSampleRate from the config if defined
    sampleRate = tracingConfig.tracesSampleRate;
  } else {
    // Default sample rate if none provided
    sampleRate = 1;
  }

  // Validate the sample rate
  if (!YU.isValidSampleRate(sampleRate)) {
    if (rW.DEBUG_BUILD) {
      k8.logger.warn("[Tracing] Discarding interaction span because of invalid sample rate.");
    }
    return false;
  }

  // Return values based on the sample rate
  if (sampleRate === true) {
    return baseSampleValue;
  } else if (sampleRate === false) {
    return 0;
  }

  // Return the product of the sample rate and the base value
  return sampleRate * baseSampleValue;
}

module.exports = getTransactionSampleRate;