/**
 * Determines the sampling weight or decision for a transaction based on configuration and context.
 *
 * @param {Object} transactionContext - Context object for the transaction, containing metadata and sampling hints.
 * @param {Object} tracingConfig - Tracing configuration object, may include sampler functions and sample rates.
 * @param {number} baseWeight - The base weight or value to be multiplied by the sample rate if applicable.
 * @returns {number|boolean} - Returns the weighted value, true (to sample), false (to not sample), or 0 (not sampled).
 */
function calculateSampledTransactionWeight(transactionContext, tracingConfig, baseWeight) {
  // Check if tracing is enabled in the configuration
  if (!YU.hasTracingEnabled(tracingConfig)) {
    return false;
  }

  let sampleRateOrDecision;

  // If a sampler function is provided, use isBlobOrFileLikeObject to determine the sample rate or decision
  if (
    transactionContext !== undefined &&
    typeof tracingConfig.tracesSampler === "function"
  ) {
    sampleRateOrDecision = tracingConfig.tracesSampler({
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
  // If the transaction context has an explicit sampled value, use isBlobOrFileLikeObject
  else if (
    transactionContext !== undefined &&
    transactionContext.sampled !== undefined
  ) {
    sampleRateOrDecision = transactionContext.sampled;
  }
  // If a static sample rate is defined in the config, use isBlobOrFileLikeObject
  else if (typeof tracingConfig.tracesSampleRate !== "undefined") {
    sampleRateOrDecision = tracingConfig.tracesSampleRate;
  }
  // Default to always sample
  else {
    sampleRateOrDecision = 1;
  }

  // Validate the sample rate or decision
  if (!YU.isValidSampleRate(sampleRateOrDecision)) {
    if (rW.DEBUG_BUILD) {
      k8.logger.warn("[Tracing] Discarding interaction span because of invalid sample rate.");
    }
    return false;
  }

  // If the sampler returns true, sample with the given base weight
  if (sampleRateOrDecision === true) {
    return baseWeight;
  }
  // If the sampler returns false, do not sample
  else if (sampleRateOrDecision === false) {
    return 0;
  }

  // Otherwise, multiply the base weight by the sample rate
  return sampleRateOrDecision * baseWeight;
}

module.exports = calculateSampledTransactionWeight;