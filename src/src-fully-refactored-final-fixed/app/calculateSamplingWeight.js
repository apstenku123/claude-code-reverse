/**
 * Determines the sampling weight for a tracing transaction based on configuration and context.
 *
 * @param {Object} transactionContext - The context of the transaction, including name, parentSampled, data, attributes, and sampled.
 * @param {Object} tracingConfig - The tracing configuration object, which may include tracesSampler (function) and tracesSampleRate (number).
 * @param {number} baseWeight - The base weight or value to be multiplied by the sampling rate.
 * @returns {number|boolean} Returns the weighted sample value, true (to use baseWeight), false (to discard), or 0 (to skip sampling).
 */
function calculateSamplingWeight(transactionContext, tracingConfig, baseWeight) {
  // Check if tracing is enabled for the given configuration
  if (!YU.hasTracingEnabled(tracingConfig)) {
    return false;
  }

  let samplingDecision;

  // If a transaction context is provided and a custom sampler function exists, use isBlobOrFileLikeObject
  if (
    transactionContext !== undefined &&
    typeof tracingConfig.tracesSampler === "function"
  ) {
    samplingDecision = tracingConfig.tracesSampler({
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
  else if (
    transactionContext !== undefined &&
    transactionContext.sampled !== undefined
  ) {
    samplingDecision = transactionContext.sampled;
  }
  // Otherwise, use the static sample rate from config if available
  else if (typeof tracingConfig.tracesSampleRate !== "undefined") {
    samplingDecision = tracingConfig.tracesSampleRate;
  }
  // Default to 1 (always sample) if nothing else is specified
  else {
    samplingDecision = 1;
  }

  // Validate the sampling decision
  if (!YU.isValidSampleRate(samplingDecision)) {
    if (rW.DEBUG_BUILD) {
      k8.logger.warn("[Tracing] Discarding interaction span because of invalid sample rate.");
    }
    return false;
  }

  // If samplingDecision is true, use the baseWeight as-is
  if (samplingDecision === true) {
    return baseWeight;
  }
  // If samplingDecision is false, do not sample
  else if (samplingDecision === false) {
    return 0;
  }

  // Otherwise, multiply the baseWeight by the sampling rate
  return samplingDecision * baseWeight;
}

module.exports = calculateSamplingWeight;