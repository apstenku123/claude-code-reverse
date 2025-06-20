/**
 * Registers the default handler for the provided source observable and, optionally, for a subscription.
 *
 * @param {Object} sourceObservable - The main observable or source object to register the default handler for.
 * @param {Object} config - Configuration object used when registering the handler.
 * @param {Object} [subscription] - Optional subscription object to also register the default handler for.
 * @returns {void}
 */
const registerDefaultHandlers = (sourceObservable, config, subscription) => {
  // Register the default handler for the main source observable
  copyMissingPropertiesWithGetters(sourceObservable, config, "default");
  // If a subscription is provided, register the default handler for isBlobOrFileLikeObject as well
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, "default");
  }
};

module.exports = registerDefaultHandlers;
