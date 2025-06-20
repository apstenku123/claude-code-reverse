/**
 * Applies the 'default' configuration to the provided observables using the copyMissingPropertiesWithGetters function.
 *
 * @param {Object} sourceObservable - The primary observable to which the default configuration will be applied.
 * @param {Object} config - The configuration object to apply.
 * @param {Object} [subscription] - An optional subscription observable to which the default configuration will also be applied if provided.
 * @returns {void}
 */
const applyDefaultToObservables = (sourceObservable, config, subscription) => {
  // Apply the 'default' configuration to the primary observable
  copyMissingPropertiesWithGetters(sourceObservable, config, "default");

  // If a subscription observable is provided, apply the 'default' configuration to isBlobOrFileLikeObject as well
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, "default");
  }
};

module.exports = applyDefaultToObservables;