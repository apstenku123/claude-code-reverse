/**
 * Applies the 'unlock' operator from the 'qv' object to the provided source observable,
 * using a configuration object that is first transformed by the 'OT1' function.
 *
 * @param {Observable} sourceObservable - The observable to which the unlock operator will be applied.
 * @param {Object} config - The configuration object to be transformed and passed to the unlock operator.
 * @returns {any} The result of applying the unlock operator to the source observable with the transformed config.
 */
function applyUnlockOperatorWithTransformedConfig(sourceObservable, config) {
  // Transform the config using OT1 before passing isBlobOrFileLikeObject to the unlock operator
  const transformedConfig = OT1(config);
  // Apply the unlock operator (qv.unlock) to the source observable with the transformed config
  return N81(qv.unlock)(sourceObservable, transformedConfig);
}

module.exports = applyUnlockOperatorWithTransformedConfig;