/**
 * Retrieves proxy server configuration from environment variables.
 *
 * Checks for 'grpc_proxy', 'https_proxy', or 'http_proxy' environment variables (in that order),
 * parses the proxy URI, validates the protocol, and extracts the address and credentials if present.
 * Logs errors if the URI cannot be parsed or if the protocol is unsupported.
 *
 * @returns {Object} Proxy configuration object with 'address' and optional 'creds' properties, or an empty object if not set or invalid.
 */
function getProxyServerConfigFromEnv() {
  let proxyUri = "";
  let proxyEnvVarName = "";

  // Check for proxy environment variables in order of precedence
  if (process.env.grpc_proxy) {
    proxyEnvVarName = "grpc_proxy";
    proxyUri = process.env.grpc_proxy;
  } else if (process.env.https_proxy) {
    proxyEnvVarName = "https_proxy";
    proxyUri = process.env.https_proxy;
  } else if (process.env.http_proxy) {
    proxyEnvVarName = "http_proxy";
    proxyUri = process.env.http_proxy;
  } else {
    // No proxy environment variable set
    return {};
  }

  let parsedProxyUrl;
  try {
    // Attempt to parse the proxy URI
    parsedProxyUrl = new z36.URL(proxyUri);
  } catch (error) {
    // Log error if URI cannot be parsed
    js.log(mg.LogVerbosity.ERROR, `cannot parse value of "${proxyEnvVarName}" env var`);
    return {};
  }

  // Only 'http:' protocol is supported
  if (parsedProxyUrl.protocol !== "http:") {
    js.log(mg.LogVerbosity.ERROR, `"${parsedProxyUrl.protocol}" scheme not supported in proxy URI`);
    return {};
  }

  let credentials = null;
  // Extract credentials if present
  if (parsedProxyUrl.username) {
    if (parsedProxyUrl.password) {
      js.log(mg.LogVerbosity.INFO, "userinfo found in proxy URI");
      credentials = decodeURIComponent(`${parsedProxyUrl.username}:${parsedProxyUrl.password}`);
    } else {
      credentials = parsedProxyUrl.username;
    }
  }

  // Extract hostname and port
  let { hostname: proxyHost, port: proxyPort } = parsedProxyUrl;
  // Default port to '80' if not specified
  if (proxyPort === "") proxyPort = "80";

  const proxyConfig = {
    address: `${proxyHost}:${proxyPort}`
  };
  if (credentials) {
    proxyConfig.creds = credentials;
  }

  // Log the proxy server configuration
  dg(`Proxy server ${proxyConfig.address} set by environment variable ${proxyEnvVarName}`);

  return proxyConfig;
}

module.exports = getProxyServerConfigFromEnv;