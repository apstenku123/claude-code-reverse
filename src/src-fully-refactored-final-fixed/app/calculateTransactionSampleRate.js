/**
 * Determines the effective sample rate or sampling decision for a transaction, based on configuration and context.
 *
 * @param {Object} transactionContext - The context object for the transaction, containing metadata such as name, parentSampled, data, attributes, and sampled.
 * @param {Object} tracingConfig - The tracing configuration object, which may include tracesSampler (function) and tracesSampleRate (number).
 * @param {number} baseSampleValue - The base value to be multiplied by the sample rate if applicable.
 * @returns {number|boolean} Returns the sampling decision: `false` if tracing is disabled or sample rate is invalid, `0` if explicitly not sampled, `baseSampleValue` if sampled, or a number representing the weighted sample value.
 */
function calculateTransactionSampleRate(transactionContext, tracingConfig, baseSampleValue) {
  // Check if tracing is enabled in the configuration
  if (!YU.hasTracingEnabled(tracingConfig)) {
    return false;
  }

  let sampleRate;

  // If a transaction context and a tracesSampler function are provided, use isBlobOrFileLikeObject to determine the sample rate
  if (transactionContext !== undefined && typeof tracingConfig.tracesSampler === "function") {
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
  }
  // If transaction context has an explicit sampled value, use isBlobOrFileLikeObject
  else if (transactionContext !== undefined && transactionContext.sampled !== undefined) {
    sampleRate = transactionContext.sampled;
  }
  // If a static tracesSampleRate is defined in the config, use isBlobOrFileLikeObject
  else if (typeof tracingConfig.tracesSampleRate !== "undefined") {
    sampleRate = tracingConfig.tracesSampleRate;
  }
  // Default sample rate is 1 (always sample)
  else {
    sampleRate = 1;
  }

  // Validate the computed sample rate
  if (!YU.isValidSampleRate(sampleRate)) {
    if (rW.DEBUG_BUILD) {
      k8.logger.warn("[Tracing] Discarding interaction span because of invalid sample rate.");
    }
    return false;
  }

  // If sampleRate is true, return the base sample value (fully sampled)
  if (sampleRate === true) {
    return baseSampleValue;
  }
  // If sampleRate is false, return 0 (not sampled)
  else if (sampleRate === false) {
    return 0;
  }

  // Otherwise, return the weighted sample value
  return sampleRate * baseSampleValue;
}

module.exports = calculateTransactionSampleRate;