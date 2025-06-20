/**
 * Updates a source observable'createInteractionAccessor metadata, attributes, and data based on the provided configuration and subscription.
 *
 * @param {object} sourceObservable - The observable object to update. Must support setAttribute, setDataForKey, setMetadata, and updateName methods.
 * @param {object} config - Configuration object containing URL and metadata information.
 * @param {object} subscription - Additional subscription data used for query processing.
 * @returns {void}
 */
function updateSourceObservableFromConfig(sourceObservable, config, subscription) {
  if (!sourceObservable) return;

  // If the source is missing or is set to 'url', update the name and metadata
  if (!sourceObservable.metadata.source || sourceObservable.metadata.source === "url") {
    // buildRequestIdentifier extracts the name and source type from the config
    const [routeName, sourceType] = buildRequestIdentifier(config, {
      path: true,
      method: true
    });
    sourceObservable.updateName(routeName);
    sourceObservable.setMetadata({ source: sourceType });
  }

  // Set the 'url' attribute to the originalUrl if available, otherwise to url
  sourceObservable.setAttribute("url", config.originalUrl || config.url);

  // If a baseUrl is provided, set isBlobOrFileLikeObject as an attribute
  if (config.baseUrl) {
    sourceObservable.setAttribute("baseUrl", config.baseUrl);
  }

  // Set the 'query' data using the extractQueryStringFromRequest function, which processes config and subscription
  sourceObservable.setDataForKey("query", extractQueryStringFromRequest(config, subscription));
}

module.exports = updateSourceObservableFromConfig;