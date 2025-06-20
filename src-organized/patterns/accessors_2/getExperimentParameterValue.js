/**
 * Retrieves a parameter value from a named experiment, with fallback and side-effect logic.
 *
 * @param {object} experimentSource - The source object providing access to experiments (must have getExperiment method).
 * @param {object} experimentConfig - Configuration object containing 'experiment_name' and 'param_name' properties.
 * @param {any} fallbackValue - The value to return if the experiment parameter matches a specific condition.
 * @param {any} sideEffectInput - Input used to determine if a side-effect should be triggered.
 * @returns {any} The experiment parameter value, or the fallback value if the condition is met.
 */
function getExperimentParameterValue(experimentSource, experimentConfig, fallbackValue, sideEffectInput) {
  // Retrieve the experiment object using the experiment name and a constant (H61)
  const experiment = experimentSource.getExperiment(experimentConfig.experiment_name, H61);
  // Get the parameter value from the experiment
  const parameterValue = experiment.get(experimentConfig.param_name);

  // If the parameter value matches the fallback value according to GM1, return the fallback
  if (GM1(parameterValue, fallbackValue)) {
    return fallbackValue;
  }

  // If the side-effect condition is met, trigger the side-effect by calling getExperiment again
  if (isExposureLoggingDisabled(sideEffectInput)) {
    experimentSource.getExperiment(experimentConfig.experiment_name);
  }

  // Return the parameter value
  return parameterValue;
}

module.exports = getExperimentParameterValue;