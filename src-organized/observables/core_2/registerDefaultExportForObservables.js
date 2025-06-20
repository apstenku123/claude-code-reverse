/**
 * Registers the default export for the provided observables and optional subscription.
 * Calls the copyPropertiesWithGetters function to handle the registration process.
 *
 * @param {Object} sourceObservable - The main observable object to register.
 * @param {Object} config - The configuration object for registration.
 * @param {Object} [subscription] - Optional subscription object to also register.
 * @returns {void}
 */
const registerDefaultExportForObservables = (sourceObservable, config, subscription) => {
  // Register the default export for the main observable
  copyPropertiesWithGetters(sourceObservable, config, "default");
  // If a subscription is provided, register its default export as well
  if (subscription) {
    copyPropertiesWithGetters(subscription, config, "default");
  }
};

module.exports = registerDefaultExportForObservables;
