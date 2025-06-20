/**
 * Registers the default export from a source observable and, optionally, from a subscription.
 *
 * @param {Object} sourceObservable - The primary observable or module to register the default export from.
 * @param {Object} config - Configuration object used during registration.
 * @param {Object} [subscription] - Optional subscription or secondary observable to also register the default export from.
 * @returns {void}
 */
const registerDefaultExport = (sourceObservable, config, subscription) => {
  // Register the default export from the primary source
  copyMissingPropertiesWithGetters(sourceObservable, config, "default");

  // If a subscription is provided, register its default export as well
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, "default");
  }
};

module.exports = registerDefaultExport;