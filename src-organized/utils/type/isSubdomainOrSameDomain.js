/**
 * Determines if the hostname of the target URL is either the same as or a subdomain of the base URL'createInteractionAccessor hostname.
 *
 * @param {string} baseUrl - The base URL to compare against (e.g., 'example.com').
 * @param {string} targetUrl - The target URL to check (e.g., 'sub.example.com').
 * @returns {boolean} True if the target hostname is the same as or a subdomain of the base hostname, otherwise false.
 */
function isSubdomainOrSameDomain(baseUrl, targetUrl) {
  // Parse the hostnames from the URLs using the 'lt' function (assumed to be a URL parser)
  const targetHostname = new lt(targetUrl).hostname;
  const baseHostname = new lt(baseUrl).hostname;

  // Check if hostnames are identical
  if (targetHostname === baseHostname) {
    return true;
  }

  // Check if targetHostname is a subdomain of baseHostname
  // This is true if targetHostname ends with baseHostname and is immediately preceded by a dot
  const subdomainSeparatorIndex = targetHostname.length - baseHostname.length - 1;
  const isSubdomain =
    targetHostname[subdomainSeparatorIndex] === "." &&
    targetHostname.endsWith(baseHostname);

  return isSubdomain;
}

module.exports = isSubdomainOrSameDomain;