/**
 * Checks if the given host or hostname is listed in the NO_PROXY environment variable.
 * If isBlobOrFileLikeObject is, returns undefined; otherwise, returns the provided config object.
 *
 * @param {Object} requestInfo - Object containing host and/or hostname properties to check against NO_PROXY.
 * @param {Object} config - Configuration object to return if host/hostname is not in NO_PROXY.
 * @returns {Object|undefined} Returns the config object if host/hostname is not in NO_PROXY, otherwise undefined.
 */
function getConfigIfNotInNoProxy(requestInfo, config) {
  // Destructure the no_proxy environment variable from process.env
  const { no_proxy: noProxyEnv } = process.env;

  // If NO_PROXY is set and the host or hostname matches any entry, return undefined
  if (
    noProxyEnv &&
    noProxyEnv.split(",").some(
      (noProxyHost) =>
        requestInfo.host.endsWith(noProxyHost) ||
        requestInfo.hostname.endsWith(noProxyHost)
    )
  ) {
    return undefined;
  }

  // Otherwise, return the provided config object
  return config;
}

module.exports = getConfigIfNotInNoProxy;