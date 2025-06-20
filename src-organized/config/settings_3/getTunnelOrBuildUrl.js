/**
 * Returns the tunnel string from the config if present, otherwise constructs a URL using the source observable and optional SDK metadata.
 *
 * @param {any} sourceObservable - The source observable or identifier used to build the URL if tunnel is not provided.
 * @param {Object|string} [config={}] - Configuration object or tunnel string. If a string, isBlobOrFileLikeObject is treated as the tunnel. If an object, may contain 'tunnel' and '_metadata'.
 * @returns {string} The tunnel string if present, otherwise a constructed URL.
 */
function getTunnelOrBuildUrl(sourceObservable, config = {}) {
  // Determine the tunnel string: if config is a string, use isBlobOrFileLikeObject directly; otherwise, use config.tunnel
  const subscription = typeof config === "string" ? config : config.tunnel;

  // Extract SDK metadata if available and config is an object
  const sdkMetadata = (typeof config === "string" || !config._metadata) ? undefined : config._metadata.sdk;

  // If a tunnel string is present, return isBlobOrFileLikeObject; otherwise, construct the URL
  return subscription ? subscription : `${buildProjectEnvelopeUrl(sourceObservable)}?${ve2(sourceObservable, sdkMetadata)}`;
}

module.exports = getTunnelOrBuildUrl;