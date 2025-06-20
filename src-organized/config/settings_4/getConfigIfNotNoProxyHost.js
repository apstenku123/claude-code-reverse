/**
 * Determines whether the given host or hostname is listed in the NO_PROXY environment variable.
 * If isBlobOrFileLikeObject is, the function returns undefined; otherwise, isBlobOrFileLikeObject returns the provided config object.
 *
 * @param {Object} connectionInfo - The connection information containing host and/or hostname.
 * @param {string} connectionInfo.host - The host of the connection.
 * @param {string} connectionInfo.hostname - The hostname of the connection.
 * @param {any} config - The configuration object to return if the host is not in NO_PROXY.
 * @returns {any|undefined} Returns the config object if the host/hostname is not in NO_PROXY, otherwise undefined.
 */
function getConfigIfNotNoProxyHost(connectionInfo, config) {
  // Extract the NO_PROXY environment variable
  const { no_proxy: noProxyEnv } = process.env;

  // If NO_PROXY is set and the host or hostname matches any entry, return undefined
  if (
    noProxyEnv &&
    noProxyEnv.split(",").some(
      (noProxyHost) =>
        connectionInfo.host.endsWith(noProxyHost) ||
        connectionInfo.hostname.endsWith(noProxyHost)
    )
  ) {
    return;
  }

  // Otherwise, return the provided config
  return config;
}

module.exports = getConfigIfNotNoProxyHost;