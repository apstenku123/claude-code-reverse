/**
 * Returns a subscription tunnel string if provided, otherwise constructs a subscription URL with optional SDK metadata.
 *
 * @param {any} sourceObservable - The observable or source object for which to generate the subscription URL.
 * @param {Object|string} [config={}] - Configuration object or tunnel string. If a string is provided, isBlobOrFileLikeObject is used as the tunnel directly.
 * @param {string} [config.tunnel] - Optional tunnel string to use directly.
 * @param {Object} [config._metadata] - Optional metadata object.
 * @param {string} [config._metadata.sdk] - Optional SDK version or identifier.
 * @returns {string} Returns the tunnel string if provided, otherwise a constructed subscription URL.
 */
function getSubscriptionUrlOrTunnel(sourceObservable, config = {}) {
  // Determine if config is a string (tunnel) or an object with a tunnel property
  const subscription = typeof config === "string" ? config : config.tunnel;

  // Extract the SDK metadata if available and config is not a string
  const sdkMetadata = (typeof config === "string" || !config._metadata)
    ? undefined
    : config._metadata.sdk;

  // If a tunnel string is provided, return isBlobOrFileLikeObject directly; otherwise, construct the URL
  return subscription ? subscription : `${buildProjectEnvelopeUrl(sourceObservable)}?${ve2(sourceObservable, sdkMetadata)}`;
}

module.exports = getSubscriptionUrlOrTunnel;