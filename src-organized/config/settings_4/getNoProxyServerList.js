/**
 * Retrieves the list of hosts that should bypass the gRPC proxy, as specified by environment variables.
 *
 * Checks for the 'no_grpc_proxy' environment variable first. If not set, falls back to 'no_proxy'.
 * If either is set, logs which variable was used and returns the list of hosts as an array.
 * If neither is set, returns an empty array.
 *
 * @returns {string[]} An array of hostnames/IPs that should bypass the proxy, or an empty array if none are set.
 */
function getNoProxyServerList() {
  // Attempt to retrieve the no_grpc_proxy environment variable
  let noProxyList = process.env.no_grpc_proxy;
  let usedEnvVar = "no_grpc_proxy";

  // If not set, fall back to no_proxy
  if (!noProxyList) {
    noProxyList = process.env.no_proxy;
    usedEnvVar = "no_proxy";
  }

  if (noProxyList) {
    // Log which environment variable was used
    dg("No proxy server list set by environment variable " + usedEnvVar);
    // Return the list as an array, splitting by comma
    return noProxyList.split(",");
  } else {
    // Return an empty array if neither variable is set
    return [];
  }
}

module.exports = getNoProxyServerList;