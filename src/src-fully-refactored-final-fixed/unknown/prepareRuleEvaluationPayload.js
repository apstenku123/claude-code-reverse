/**
 * Prepares a payload for rule evaluation by extracting relevant configuration and evaluation details.
 *
 * @param {any} sourceObservable - The source observable or context for the evaluation.
 * @param {object} config - The configuration object containing rule and evaluation details.
 * @param {any} subscription - The subscription or context needed for secondary exposures processing.
 * @returns {any} The result of the createInteractionEvent function, which processes the evaluation payload.
 */
function prepareRuleEvaluationPayload(sourceObservable, config, subscription) {
  // Extract evaluation details if available
  const evaluation = config.__evaluation;

  // Build the payload with basic config info
  const evaluationPayload = {
    config: config.name,
    ruleID: config.ruleID
  };

  // Add config version if present
  if (evaluation?.version != null) {
    evaluationPayload.configVersion = evaluation.version;
  }

  // Add rule pass status if present, as a string
  if (evaluation?.passed != null) {
    evaluationPayload.rulePassed = String(evaluation.passed);
  }

  // Extract secondary exposures, defaulting to an empty array if not present
  const secondaryExposures = evaluation?.secondary_exposures ?? [];

  // Process secondary exposures using s41
  const processedSecondaryExposures = s41(secondaryExposures, subscription);

  // Call createInteractionEvent with all gathered data
  return createInteractionEvent(CCA, sourceObservable, config.details, evaluationPayload, processedSecondaryExposures);
}

module.exports = prepareRuleEvaluationPayload;