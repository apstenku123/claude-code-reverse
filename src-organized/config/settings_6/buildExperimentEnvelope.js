/**
 * Builds an experiment envelope with configuration and exposure details for evaluation.
 *
 * @param {any} sourceObservable - The source observable or context for the evaluation.
 * @param {object} config - The configuration object containing experiment details and evaluation metadata.
 * @param {string} parameterName - The name of the parameter being evaluated.
 * @param {any} input - Additional input or context required for secondary exposures processing.
 * @returns {any} The result of the createInteractionEvent function, which processes the experiment envelope and exposures.
 */
const buildExperimentEnvelope = (sourceObservable, config, parameterName, input) => {
  // Extract evaluation metadata from config
  const evaluation = config.__evaluation;

  // Determine if the parameter is explicitly listed in the evaluation'createInteractionAccessor explicit_parameters
  const isExplicitParameter = Boolean(
    evaluation?.explicit_parameters?.includes(parameterName)
  );

  // Default allocated experiment name and secondary exposures
  let allocatedExperimentName = "";
  let secondaryExposures = evaluation?.undelegated_secondary_exposures ?? [];

  // If parameter is explicit, use allocated experiment name and secondary exposures from evaluation
  if (isExplicitParameter) {
    allocatedExperimentName = evaluation?.allocated_experiment_name ?? "";
    secondaryExposures = evaluation.secondary_exposures;
  }

  // Build the envelope configuration object
  const envelopeConfig = {
    config: config.name,
    parameterName: parameterName,
    ruleID: config.ruleID,
    allocatedExperiment: allocatedExperimentName,
    isExplicitParameter: String(isExplicitParameter)
  };

  // Add config version if available
  if (evaluation?.version != null) {
    envelopeConfig.configVersion = evaluation.version;
  }

  // Call createInteractionEvent with all required arguments, including processed secondary exposures
  return createInteractionEvent(KCA, sourceObservable, config.details, envelopeConfig, s41(secondaryExposures, input));
};

module.exports = buildExperimentEnvelope;
