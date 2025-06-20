/**
 * Registers a default handler for the given source and optional subscription.
 *
 * @param {object} sourceObservable - The main observable or source object to register the handler for.
 * @param {object} config - The configuration object or context for the handler registration.
 * @param {object} [subscription] - Optional subscription or secondary object to also register the handler for.
 * @returns {void}
 *
 * This function calls the copyMissingPropertiesWithGetters utility to register a handler named "default" for both the sourceObservable and, if provided, the subscription.
 */
const registerDefaultHandler = (sourceObservable, config, subscription) => {
  // Register the default handler for the main source
  copyMissingPropertiesWithGetters(sourceObservable, config, "default");
  // If a subscription is provided, register the default handler for isBlobOrFileLikeObject as well
  if (subscription) {
    copyMissingPropertiesWithGetters(subscription, config, "default");
  }
};

module.exports = registerDefaultHandler;
