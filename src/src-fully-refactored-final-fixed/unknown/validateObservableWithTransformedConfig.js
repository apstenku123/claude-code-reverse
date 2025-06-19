/**
 * Validates an observable using a configuration object after transforming the configuration.
 *
 * @param {Observable} sourceObservable - The observable to be validated.
 * @param {Object} config - The configuration object to be transformed and used for validation.
 * @returns {any} The result of the validation process.
 */
function validateObservableWithTransformedConfig(sourceObservable, config) {
  // Transform the configuration object using OT1
  const transformedConfig = OT1(config);
  // Validate the observable using the transformed configuration and qv.check
  return N81(qv.check)(sourceObservable, transformedConfig);
}

module.exports = validateObservableWithTransformedConfig;