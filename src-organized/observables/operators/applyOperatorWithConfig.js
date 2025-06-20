/**
 * Applies a custom operator function to a source observable using a provided configuration.
 *
 * @param {Observable} sourceObservable - The source observable to which the operator will be applied.
 * @param {Object} config - Configuration object for the operator.
 * @returns {Observable} - The resulting observable after applying the operator.
 */
function applyOperatorWithConfig(sourceObservable, config) {
  return D21(sourceObservable, config, function (subscription, operatorConfig) {
    // Apply the Q21 operator to the source observable with the provided configuration
    return Q21(sourceObservable, operatorConfig);
  });
}

module.exports = applyOperatorWithConfig;