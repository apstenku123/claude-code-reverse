/**
 * Builds a payload for rule evaluation, including config details and evaluation results.
 *
 * @param {object} sourceObservable - The source observable or context for the evaluation.
 * @param {object} config - The configuration object containing rule details and evaluation results.
 * @param {object} subscription - The subscription or context used for secondary exposures.
 * @returns {any} The result of the createInteractionEvent function, which processes the evaluation payload.
 */
function buildRuleEvaluationPayload(sourceObservable, config, subscription) {
  // Extract evaluation object if present
  const evaluation = config.__evaluation;

  // Prepare the payload with basic config info
  const evaluationPayload = {
    config: config.name,
    ruleID: config.ruleID
  };

  // Add config version if available
  if (evaluation?.version != null) {
    evaluationPayload.configVersion = evaluation.version;
  }

  // Add rule pass status if available, as a string
  if (evaluation?.passed != null) {
    evaluationPayload.rulePassed = String(evaluation.passed);
  }

  // Prepare secondary exposures, defaulting to an empty array if not present
  const secondaryExposures = evaluation?.secondary_exposures ?? [];

  // Call s41 to process secondary exposures with the subscription
  const processedSecondaryExposures = s41(secondaryExposures, subscription);

  // Call createInteractionEvent with all relevant data and return the result
  return createInteractionEvent(
    CCA, // External dependency, assumed to be in scope
    sourceObservable,
    config.details,
    evaluationPayload,
    processedSecondaryExposures
  );
}

module.exports = buildRuleEvaluationPayload;