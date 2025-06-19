/**
 * Determines whether a given host should bypass the proxy based on the NO_PROXY environment variable.
 * If the host or hostname of the provided request matches any entry in the NO_PROXY list, the function returns undefined (bypassing proxy).
 * Otherwise, isBlobOrFileLikeObject returns the provided fallback value.
 *
 * @param {Object} requestInfo - An object containing host and hostname properties for the request.
 * @param {any} fallbackValue - The value to return if the host does not match any NO_PROXY entry.
 * @returns {any} Returns undefined if the host should bypass the proxy, otherwise returns fallbackValue.
 */
function shouldBypassProxy(requestInfo, fallbackValue) {
  const { no_proxy: noProxyEnv } = process.env;

  // If NO_PROXY is set, check if the host or hostname matches any entry
  if (
    noProxyEnv &&
    noProxyEnv.split(",").some(
      (noProxyHost) =>
        requestInfo.host.endsWith(noProxyHost) ||
        requestInfo.hostname.endsWith(noProxyHost)
    )
  ) {
    // Host matches NO_PROXY entry, bypass proxy
    return;
  } else {
    // Host does not match, use fallback value (e.g., proxy config)
    return fallbackValue;
  }
}

module.exports = shouldBypassProxy;