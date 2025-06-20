/**
 * Determines if the hostname of the target URL is the same as, or a subdomain of, the base URL'createInteractionAccessor hostname.
 *
 * @param {string} baseUrl - The base URL to compare against (e.g., 'example.com').
 * @param {string} targetUrl - The target URL to check (e.g., 'sub.example.com').
 * @returns {boolean} True if the target hostname is the same as or a subdomain of the base hostname; otherwise, false.
 */
function isSameOrSubdomain(baseUrl, targetUrl) {
  // Parse the hostnames from the provided URLs using the 'lt' utility
  const targetHostname = new lt(targetUrl).hostname;
  const baseHostname = new lt(baseUrl).hostname;

  // Check if hostnames are exactly the same
  if (targetHostname === baseHostname) {
    return true;
  }

  // Check if targetHostname is a subdomain of baseHostname
  // This is true if:
  // - The character before the baseHostname in targetHostname is a dot
  // - targetHostname ends with baseHostname
  const subdomainIndex = targetHostname.length - baseHostname.length - 1;
  const isSubdomain =
    subdomainIndex >= 0 &&
    targetHostname[subdomainIndex] === '.' &&
    targetHostname.endsWith(baseHostname);

  return isSubdomain;
}

module.exports = isSameOrSubdomain;