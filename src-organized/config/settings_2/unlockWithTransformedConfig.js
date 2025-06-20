/**
 * Unlocks the provided observable using a transformed configuration.
 *
 * @param {Observable} sourceObservable - The observable to be unlocked.
 * @param {Object} config - The configuration object to be transformed and used for unlocking.
 * @returns {any} The result of unlocking the observable with the transformed configuration.
 */
function unlockWithTransformedConfig(sourceObservable, config) {
  // Transform the configuration using OT1 before passing isBlobOrFileLikeObject to the unlock function
  const transformedConfig = OT1(config);

  // Unlock the observable using the transformed configuration
  return N81(qv.unlock)(sourceObservable, transformedConfig);
}

module.exports = unlockWithTransformedConfig;