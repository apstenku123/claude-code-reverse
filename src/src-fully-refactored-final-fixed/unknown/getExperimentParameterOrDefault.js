/**
 * Retrieves a parameter value from a specified experiment. If the value matches the default,
 * returns the default value. Optionally triggers an experiment fetch based on a condition.
 *
 * @param {Object} experimentSource - The source object providing access to experiments.
 * @param {Object} experimentConfig - Contains 'experiment_name' and 'param_name' to identify the parameter.
 * @param {any} defaultValue - The default value to return if the parameter matches this value.
 * @param {any} triggerCondition - Condition to determine if the experiment should be (re)fetched.
 * @returns {any} The parameter value from the experiment, or the default value if matched.
 */
function getExperimentParameterOrDefault(experimentSource, experimentConfig, defaultValue, triggerCondition) {
  // Retrieve the experiment object using the experiment name and a constant (H61)
  const experiment = experimentSource.getExperiment(experimentConfig.experiment_name, H61);
  // Get the parameter value from the experiment
  const parameterValue = experiment.get(experimentConfig.param_name);

  // If the parameter value matches the default, return the default value
  if (GM1(parameterValue, defaultValue)) {
    return defaultValue;
  }

  // If the trigger condition is met, (re)fetch the experiment (side effect)
  if (isExposureLoggingDisabled(triggerCondition)) {
    experimentSource.getExperiment(experimentConfig.experiment_name);
  }

  // Return the actual parameter value
  return parameterValue;
}

module.exports = getExperimentParameterOrDefault;