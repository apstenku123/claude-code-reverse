/**
 * Initializes the default export for the provided source and optional subscription.
 * Calls the copyMissingPropertiesWithGetters function to set up the default export for both the main source and, if provided, the subscription.
 *
 * @param {object} sourceObservable - The main source object to initialize.
 * @param {object} config - The configuration object used for initialization.
 * @param {object} [subscription] - Optional subscription object to also initialize.
 * @returns {void}
 */
const initializeDefaultExports = (sourceObservable, config, subscription) => {
  // Initialize the default export for the main source
  copyMissingPropertiesWithGetters(sourceObservable, config, "default");
  // If a subscription is provided, initialize its default export as well
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, "default");
  }
};

module.exports = initializeDefaultExports;
