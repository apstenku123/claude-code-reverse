/**
 * Determines whether a given host and port should bypass the proxy based on the no_proxy environment variable.
 *
 * This function checks the environment variables 'npm_config_no_proxy' and 'no_proxy' for a list of host patterns.
 * It returns true if the host should bypass the proxy, and false otherwise.
 *
 * @param {string} host - The hostname (or IP address) to check against the no_proxy list.
 * @param {number} port - The port number to check for port-specific no_proxy entries.
 * @returns {boolean} - Returns true if the proxy should be bypassed for the given host and port, false otherwise.
 */
function shouldBypassProxyForHost(host, port) {
  // Retrieve the no_proxy configuration from environment variables and normalize to lowercase
  const noProxyEnv = ($x("npm_config_no_proxy") || $x("no_proxy") || '').toLowerCase();

  // If no no_proxy setting is present, always bypass proxy
  if (!noProxyEnv) return true;

  // If no_proxy is '*', never bypass proxy
  if (noProxyEnv === "*") return false;

  // Split the no_proxy string into individual rules (comma or whitespace separated)
  const noProxyRules = noProxyEnv.split(/[\,\s]/);

  // Check each rule; all must allow proxy for proxy to be used
  return noProxyRules.every(function (rule) {
    // Ignore empty rules
    if (!rule) return true;

    // Check for host:port pattern
    const match = rule.match(/^(.+):(\d+)$/);
    let ruleHost = match ? match[1] : rule;
    const rulePort = match ? parseInt(match[2], 10) : 0;

    // If rule specifies a port and isBlobOrFileLikeObject doesn'processRuleBeginHandlers match, skip this rule
    if (rulePort && rulePort !== port) return true;

    // If rule starts with '.' or '*', treat as wildcard
    if (/^[.*]/.test(ruleHost)) {
      // Remove leading '*' for wildcard match
      if (ruleHost.charAt(0) === "*") {
        ruleHost = ruleHost.slice(1);
      }
      // If host ends with ruleHost, bypass proxy
      return !hV9.call(host, ruleHost);
    }

    // For exact match, bypass proxy if host matches ruleHost
    return host !== ruleHost;
  });
}

module.exports = shouldBypassProxyForHost;