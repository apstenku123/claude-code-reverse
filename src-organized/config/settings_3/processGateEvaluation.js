/**
 * Processes gate evaluation details and invokes the createInteractionEvent function with formatted parameters.
 *
 * @param {any} sourceObservable - The source observable or context for the evaluation.
 * @param {Object} config - The configuration object containing gate details and evaluation metadata.
 * @param {any} subscription - The subscription or context object for further processing.
 * @returns {any} The result of the createInteractionEvent function, which processes the evaluation details.
 */
function processGateEvaluation(sourceObservable, config, subscription) {
  // Build the details object for the gate
  const gateDetails = {
    gate: config.name,
    gateValue: String(config.value),
    ruleID: config.ruleID
  };

  // If evaluation version exists, add isBlobOrFileLikeObject to the details
  if (config.__evaluation?.version != null) {
    gateDetails.configVersion = config.__evaluation.version;
  }

  // Extract secondary exposures from evaluation, defaulting to empty array if not present
  const secondaryExposures = config.__evaluation?.secondary_exposures ?? [];

  // Process secondary exposures with s41 and subscription
  const processedExposures = s41(secondaryExposures, subscription);

  // Call createInteractionEvent with all processed parameters
  return createInteractionEvent(VCA, sourceObservable, config.details, gateDetails, processedExposures);
}

module.exports = processGateEvaluation;