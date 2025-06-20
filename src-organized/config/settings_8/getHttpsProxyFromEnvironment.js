/**
 * Retrieves the HTTPS proxy URL from environment variables.
 *
 * This function checks for the presence of common environment variables that specify an HTTP or HTTPS proxy configuration.
 * It returns the value of the first found variable in the following order of precedence:
 *   1. https_proxy
 *   2. HTTPS_PROXY
 *   3. http_proxy
 *   4. HTTP_PROXY
 *
 * @returns {string|undefined} The proxy URL if set in the environment, otherwise undefined.
 */
function getHttpsProxyFromEnvironment() {
  // Check each environment variable in order of precedence and return the first one that is set
  return (
    process.env.https_proxy ||
    process.env.HTTPS_PROXY ||
    process.env.http_proxy ||
    process.env.HTTP_PROXY
  );
}

module.exports = getHttpsProxyFromEnvironment;