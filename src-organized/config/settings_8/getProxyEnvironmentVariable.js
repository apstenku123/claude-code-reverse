/**
 * Retrieves the proxy server URL from environment variables.
 *
 * This function checks for the presence of proxy-related environment variables in the following order:
 *   1. https_proxy
 *   2. HTTPS_PROXY
 *   3. http_proxy
 *   4. HTTP_PROXY
 * Returns the value of the first variable found, or undefined if none are set.
 *
 * @returns {string|undefined} The proxy server URL if set in the environment variables, otherwise undefined.
 */
function getProxyEnvironmentVariable() {
  // Check for proxy environment variables in order of precedence
  return (
    process.env.https_proxy ||
    process.env.HTTPS_PROXY ||
    process.env.http_proxy ||
    process.env.HTTP_PROXY
  );
}

module.exports = getProxyEnvironmentVariable;