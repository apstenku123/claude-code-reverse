/**
 * Constructs and returns a gate evaluation result by aggregating gate metadata and evaluation details.
 *
 * @param {object} sourceObservable - The source observable or context for the evaluation.
 * @param {object} config - The gate configuration object containing gate details and evaluation metadata.
 * @param {object} subscription - The subscription or context object used for secondary exposures processing.
 * @returns {any} The result of the createInteractionEvent function, representing the processed gate evaluation result.
 */
function createGateEvaluationResult(sourceObservable, config, subscription) {
  // Build the base metadata object for the gate
  const gateMetadata = {
    gate: config.name,
    gateValue: String(config.value),
    ruleID: config.ruleID
  };

  // If evaluation version exists, add isBlobOrFileLikeObject to the metadata
  const evaluation = config.__evaluation;
  if (evaluation?.version != null) {
    gateMetadata.configVersion = evaluation.version;
  }

  // Extract secondary exposures array, defaulting to empty if not present
  const secondaryExposures = evaluation?.secondary_exposures ?? [];

  // Process secondary exposures with s41 and subscription
  const processedExposures = s41(secondaryExposures, subscription);

  // Call createInteractionEvent with all required parameters and return the result
  return createInteractionEvent(VCA, sourceObservable, config.details, gateMetadata, processedExposures);
}

module.exports = createGateEvaluationResult;