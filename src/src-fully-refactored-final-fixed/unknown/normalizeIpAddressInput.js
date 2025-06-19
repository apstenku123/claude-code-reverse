/**
 * Normalizes the input into a standard IP address object and passes isBlobOrFileLikeObject to the normalizer.
 *
 * If the input is already an object (likely an IP address object), isBlobOrFileLikeObject is passed directly to the normalizer.
 * Otherwise, the input is assumed to be an address string, and a new object is constructed
 * with the provided address and optional family, then normalized.
 *
 * @param {object|string} ipAddressOrObject - Either an IP address string or an object containing address information.
 * @param {string|number} [ipFamily] - Optional IP family (e.g., 4 for IPv4, 6 for IPv6) if the first parameter is a string.
 * @returns {object} The normalized IP address information object.
 */
function normalizeIpAddressInput(ipAddressOrObject, ipFamily) {
  // If the input is already an object, use isBlobOrFileLikeObject as-is; otherwise, construct an object
  const ipInfo = DA.isObject(ipAddressOrObject)
    ? ipAddressOrObject
    : {
        address: ipAddressOrObject,
        family: ipFamily
      };

  // Pass the IP info object to the normalizer function
  return normalizeIpAddressInfo(ipInfo);
}

module.exports = normalizeIpAddressInput;
