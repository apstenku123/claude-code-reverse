/**
 * Builds an evaluation context object and delegates to createInteractionEvent for further processing.
 *
 * @param {any} sourceObservable - The source observable or input data for evaluation.
 * @param {object} config - The configuration object containing evaluation details.
 * @param {string} parameterName - The name of the parameter being evaluated.
 * @param {any} inputContext - Additional context or input required for secondary exposures.
 * @returns {any} The result of the createInteractionEvent function, which processes the evaluation context.
 */
const buildEvaluationContext = (sourceObservable, config, parameterName, inputContext) => {
  // Extract evaluation details from config
  const evaluation = config.__evaluation;

  // Check if the parameter is explicitly listed in evaluation.explicit_parameters
  const isExplicitParameter = Boolean(
    evaluation?.explicit_parameters?.includes(parameterName) === true
  );

  // Default allocated experiment name and secondary exposures
  let allocatedExperimentName = "";
  let secondaryExposures = evaluation?.undelegated_secondary_exposures ?? [];

  // If the parameter is explicit, use allocated_experiment_name and secondary_exposures
  if (isExplicitParameter) {
    allocatedExperimentName = evaluation?.allocated_experiment_name ?? "";
    secondaryExposures = evaluation.secondary_exposures;
  }

  // Build the evaluation context object
  const evaluationContext = {
    config: config.name,
    parameterName: parameterName,
    ruleID: config.ruleID,
    allocatedExperiment: allocatedExperimentName,
    isExplicitParameter: String(isExplicitParameter)
  };

  // Optionally add configVersion if available
  if (config.__evaluation?.version != null) {
    evaluationContext.configVersion = config.__evaluation.version;
  }

  // Delegate to createInteractionEvent with all required arguments
  return createInteractionEvent(KCA, sourceObservable, config.details, evaluationContext, s41(secondaryExposures, inputContext));
};

module.exports = buildEvaluationContext;
