/**
 * Applies a checked transformation to a source observable using a provided configuration.
 *
 * @param {Observable} sourceObservable - The observable to which the transformation will be applied.
 * @param {Object} config - The configuration object for the transformation.
 * @returns {any} The result of applying the checked transformation to the source observable.
 */
function applyCheckedTransformation(sourceObservable, config) {
  // Transform the configuration using OT1 before passing isBlobOrFileLikeObject to the checker
  const transformedConfig = OT1(config);

  // Use N81 to apply qv.check to the source observable with the transformed config
  return N81(qv.check)(sourceObservable, transformedConfig);
}

module.exports = applyCheckedTransformation;