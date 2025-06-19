/**
 * Determines if a given host (from a URL) is allowed based on the provided rule(createInteractionAccessor).
 *
 * @param {boolean|Array<string>} allowedRules - Either a boolean flag or an array of allowed host rules.
 *   - If true, any host is allowed.
 *   - If an array, checks if any rule matches the host.
 * @param {string} urlString - The URL string whose host will be checked against the rules.
 * @returns {boolean} True if the host is allowed by the rules, false otherwise.
 */
function isHostAllowedByRule(allowedRules, urlString) {
  // Parse the URL to extract the host
  const url = new URL(urlString);

  // If allowedRules is strictly true, allow any host
  if (allowedRules === true) {
    return true;
  }

  // If allowedRules is an array, check if any rule matches the host
  if (Array.isArray(allowedRules) && allowedRules.some(rule => KEY(rule, url.host))) {
    return true;
  }

  // Otherwise, the host is not allowed
  return false;
}

module.exports = isHostAllowedByRule;