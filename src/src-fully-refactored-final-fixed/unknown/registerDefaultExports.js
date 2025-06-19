/**
 * Registers the default export for a source observable and, optionally, a subscription.
 *
 * @param {object} sourceObservable - The main observable or module to register the default export for.
 * @param {object} config - The configuration object or context in which to register the default export.
 * @param {object} [subscription] - Optional subscription or additional module to also register the default export for.
 * @returns {void}
 */
const registerDefaultExports = (sourceObservable, config, subscription) => {
  // Register the default export for the main observable/module
  copyMissingPropertiesWithGetters(sourceObservable, config, "default");

  // If a subscription is provided, also register its default export
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, "default");
  }
};

module.exports = registerDefaultExports;
