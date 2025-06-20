/**
 * Retrieves a parameter value from a specified layer of a source observable.
 * If the retrieved value matches the provided subscription (using GM1), returns the subscription instead.
 * Optionally, if the provided flag is truthy (checked by isExposureLoggingDisabled), triggers a side-effect by accessing the parameter again.
 *
 * @param {Object} sourceObservable - The object providing access to layers and their parameters.
 * @param {Object} config - Configuration object containing 'layer_name' and 'param_name'.
 * @param {any} subscription - The value to compare against the retrieved parameter.
 * @param {any} sideEffectFlag - Flag to determine if the side-effect should be triggered.
 * @returns {any} - The parameter value from the layer, or the subscription if matched.
 */
function getLayerParameterOrDefault(sourceObservable, config, subscription, sideEffectFlag) {
  // Retrieve the parameter value from the specified layer using a constant H61
  const parameterValue = sourceObservable.getLayer(config.layer_name, H61).get(config.param_name);

  // If the parameter value matches the subscription (using GM1), return the subscription
  if (GM1(parameterValue, subscription)) {
    return subscription;
  }

  // If the sideEffectFlag passes the isExposureLoggingDisabled check, trigger a side-effect by accessing the parameter again
  if (isExposureLoggingDisabled(sideEffectFlag)) {
    sourceObservable.getLayer(config.layer_name).get(config.param_name);
  }

  // Return the retrieved parameter value
  return parameterValue;
}

module.exports = getLayerParameterOrDefault;